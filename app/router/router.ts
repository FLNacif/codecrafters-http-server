import { HttpMethod } from "../http/model/http.method";
import { HttpRequest } from "../http/model/http.request";
import { HttpResponse } from "../http/model/http.response";
import { HttpStatusCode } from "../http/model/http.statusCode";

export class Router {
    static controllers: any = {}

    static onGet(resource: string, handler: (request: HttpRequest) => HttpResponse) {
        if(!this.controllers[resource]) this.controllers[resource] = {}
        this.controllers[resource][HttpMethod.GET] = { handler }
    }

    static route(request: HttpRequest): HttpResponse {
        if (this.controllers[request.target]?.[request.action]) {
            return this.controllers[request.target][request.action].handler()
        } else {
            return new HttpResponse(HttpStatusCode.Not_Found)
        }
    }
}