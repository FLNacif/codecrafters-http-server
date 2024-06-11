import { HttpMethod } from "../http/model/http.method";
import { HttpRequest } from "../http/model/http.request";
import { HttpResponse } from "../http/model/http.response";
import { HttpStatusCode } from "../http/model/http.statusCode";
import { Controller } from "../model/controller";

export class Router {
    static controllers: Controller[] = []

    static onGet(incommingPath: string, handler: (request: HttpRequest) => HttpResponse) {
        Router.on(HttpMethod.GET, incommingPath, handler)
    }

    static onPost(incommingPath: string, handler: (request: HttpRequest) => HttpResponse) {
        Router.on(HttpMethod.POST, incommingPath, handler)
    }


    static on(method: HttpMethod, incommingPath: string, handler: (request: HttpRequest) => HttpResponse) {
        let routeToController = this.controllers.find((controller) => Router.match({ method, path: incommingPath }, { method: controller.method, path: controller.path }))
        
        if(!routeToController) { 
            Router.controllers.push({ path: incommingPath, method, handler })
        } else {
            throw new Error('Already defined controller')
        }
    }

    static route(request: HttpRequest): HttpResponse {
        const routeToController = this.controllers.find((controller) => Router.match(request, controller))
        if (routeToController) {
            const variables: {[key: string]: string} = Router.extractVariables(request.path, routeToController.path)
            request.setPathVariables(variables)
            return routeToController.handler(request)
        } else {
            return new HttpResponse(HttpStatusCode.Not_Found)
        }
    }

    private static match(incomingPath: { method: HttpMethod, path: string }, controllerPath: { method: HttpMethod, path: string }): boolean {
        if (incomingPath.method != controllerPath.method) return false
        const incomingPathSplitted = Router.splitPath(incomingPath.path)
        const controllerPathSplitted = Router.splitPath(controllerPath.path)

        for(let i = 0; i< incomingPathSplitted.length; i++) {
            if (i >= controllerPathSplitted.length) return false
            if (!controllerPathSplitted[i].startsWith('{')) {
                if (incomingPathSplitted[i] != controllerPathSplitted[i]) return false
            }
        }
        return incomingPathSplitted.length == controllerPathSplitted.length
    }

    private static extractVariables(incomingPath: string, controllerPath: string): { [key: string]: string } {
        const incomingPathSplitted = Router.splitPath(incomingPath)
        const controllerPathSplitted = Router.splitPath(controllerPath)

        const variables: { [key: string]: string } = {}
        for(let i = 0; i< incomingPathSplitted.length; i++) {
            if (i >= controllerPathSplitted.length) throw new Error('Paths does not have same size')
            if (controllerPathSplitted[i].startsWith('{')) {
                const varName = controllerPathSplitted[i].split('{')[1].split('}')[0]
                variables[varName] = incomingPathSplitted[i].split('}')[0]
            }
        }
        return variables 
    }

    private static splitPath(path: string): string[] {
        return path.split('/')
    }
}