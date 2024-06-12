import { HttpHeader, HttpHeaders } from "./http.headers";
import { HttpStatusCode } from "./http.statusCode";

export class HttpResponse {
    constructor(private statusCode: HttpStatusCode = 200, private headers: HttpHeader = {}, private body: any = ''){
        this.headers[HttpHeaders.Content_Length] = body.length
    }

    private getStatus(): string {
        return `HTTP/1.1 ${this.statusCode} ${HttpStatusCode.getReasonPhrase(this.statusCode)}`
    }

    public setStatus(status: HttpStatusCode) {
        this.statusCode = status
        return this
    }

    public setBody(body: any) {
        this.body = body
        return this
    }

    public setHeaders(headers: HttpHeader) {
        this.headers = headers
        return this
    }

    private getHeaders() {
        let headerString = ""
        for (let header in this.headers) {
            headerString = headerString+`${header}: ${this.headers[header]}\r\n`
        }
        return headerString
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