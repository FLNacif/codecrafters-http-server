import { HttpMethod } from "./http.method"

export class HttpRequest {
    public readonly action: HttpMethod
    public readonly path: string
    public readonly httpVersion: string

    constructor(data: string){
        const lines = data.split('\r\n')
        const requestLine = lines[0].split(' ')

        this.action = HttpMethod.getVerb(requestLine[0])
        this.path = requestLine[1]
        this.httpVersion = requestLine[2]
    }
}