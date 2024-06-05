import { HttpStatusCode } from "./http.statusCode";

export class HttpResponse {
    constructor(private statusCode: HttpStatusCode, private headers?: Map<string, string>, private body?: any){
    }

    private getStatus(): string {
        return `HTTP/1.1 ${this.statusCode} ${HttpStatusCode.getReasonPhrase(this.statusCode)}\r\n`
    }

    private getHeaders() {
        return `\r\n`
    }

    private getBody() {
        if (typeof this.body === 'string') {
            return this.body
        }
        if (this.body == null) return ''

        return JSON.stringify(this.body)
    }

    public send(): string {
        return  `${this.getStatus()}\r\n` +
                `${this.getHeaders()}\r\n` +
                `${this.getBody()}`
    }

}