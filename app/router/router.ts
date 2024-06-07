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

    static on(method: HttpMethod, incommingPath: string, handler: (request: HttpRequest) => HttpResponse) {
        let routeToController = this.controllers.find((controller) => Router.match(incommingPath, controller.path))
        
        if(!routeToController) { 
            Router.controllers.push({ path: incommingPath, method, handler })
        } else {
            throw new Error('Already defined controller')
        }
    }

    static route(request: HttpRequest): HttpResponse {
        const routeToController = this.controllers.find((controller) => Router.match(request.path, controller.path))

        if (routeToController) {
            return routeToController.handler(request)
        } else {
            return new HttpResponse(HttpStatusCode.Not_Found)
        }
    }

    private static match(incomingPathRequest: string, controllerPath: string): boolean {
        const controllerPathAsRegex = new RegExp(`^${controllerPath}$`)
        return controllerPathAsRegex.test(incomingPathRequest)
    }
}