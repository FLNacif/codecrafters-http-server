import { HttpMethod } from "../http/model/http.method"
import { HttpResponse } from "../http/model/http.response"

export interface Controller {
    path: string
    method: HttpMethod
    handler: (...params: any) => HttpResponse
}