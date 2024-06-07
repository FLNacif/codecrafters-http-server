import { HttpStatusCode } from "./http.statusCode";

export class HttpResponse {
    constructor(private statusCode: HttpStatusCode, private headers?: { [key: string]: string | number }, private body?: any){
    }

    private getStatus(): string {
        return `HTTP/1.1 ${this.statusCode} ${HttpStatusCode.getReasonPhrase(this.statusCode)}`
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