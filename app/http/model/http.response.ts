import { NetConnectOpts, Socket } from "net";
import { CompressionFactory } from "../compression/compression-factory";
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
        if (!body) body = ''
        this.body = body
        return this
    }

    public setHeader(header: HttpHeaders, value: string | number) {
        this.headers[header] = value
    }

    public setHeaders(headers: HttpHeader) {
        this.headers = { ...this.headers, ...headers }
        return this
    }

    private getHeaders() {
        let headerString = ""
        for (let header in this.headers) {
            headerString = headerString+`${header}: ${this.headers[header]}\r\n`
        }
        return headerString
    }

    private getBody(): Buffer {
        let returnedBody
        if (this.headers[HttpHeaders.Content_Encodding]) {
            returnedBody = CompressionFactory.encoding(this.headers[HttpHeaders.Content_Encodding] as string, this.body)
        } else {
            returnedBody = Buffer.from(this.body)
        }
        
        this.setHeader(HttpHeaders.Content_Length, returnedBody.length)
        return returnedBody
    }

    public send(socket: Socket) {
        const body = this.getBody()
        const status = this.getStatus()
        const headers = this.getHeaders()

        socket.write(`${status}\r\n` +
                `${headers}\r\n`)
        socket.write(body)
    }

}