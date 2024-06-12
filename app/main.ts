import * as net from 'net';
import { HttpResponse } from './http/model/http.response';
import { HttpRequest } from './http/model/http.request';
import { Router } from './router/router';
import { HttpStatusCode } from './http/model/http.statusCode';
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { supportedCompressions } from './http/compression';
import { HttpHeader, HttpHeaders } from './http/model/http.headers';

Router.onGet('/', () => {
    return new HttpResponse(HttpStatusCode.OK)
})

Router.onGet('/user-agent', (request: HttpRequest, response: HttpResponse) => {
    const userAgent = request.headers[HttpHeaders.User_Agent]
    const responseHeaders: HttpHeader = {}
    responseHeaders[HttpHeaders.Content_Type] = 'text/plain'
    return new HttpResponse(200, responseHeaders, userAgent)
})

Router.onGet('/files/{filename}', (request: HttpRequest, response: HttpResponse) => {
    const filename = request.getPathVariables('filename')
    const directory = process.argv[process.argv.findIndex((arg) => arg == '--directory') + 1]
    if (!readdirSync(directory).includes(filename)) return new HttpResponse(HttpStatusCode.Not_Found)
    const file = readFileSync(`${directory}/${filename}`, { encoding: 'utf8' })
    const responseHeaders: HttpHeader = {}
    responseHeaders[HttpHeaders.Content_Type] = 'application/octet-stream'
    return response.setStatus(HttpStatusCode.OK).setHeaders(responseHeaders).setBody(file)
})

Router.onPost('/files/{filename}', (request: HttpRequest, response: HttpResponse) => {
    const filename = request.getPathVariables('filename')
    const directory = process.argv[process.argv.findIndex((arg) => arg == '--directory') + 1]
    
    writeFileSync(`${directory}/${filename}`, request.body)
    const responseHeaders: HttpHeader = {}
    responseHeaders[HttpHeaders.Content_Type] = 'application/octet-stream'
    return response.setStatus(HttpStatusCode.Created).setHeaders(responseHeaders).setBody(request.body)
})

Router.onGet('/echo/{echo}', (request: HttpRequest, response: HttpResponse) => {
    const echo = request.getPathVariables('echo')
    const responseHeaders: HttpHeader = {}
    if (supportedCompressions.includes(request.headers[HttpHeaders.Accept_Encodding]))
        responseHeaders[HttpHeaders.Content_Encodding] = request.headers[HttpHeaders.Accept_Encodding]
    responseHeaders[HttpHeaders.Content_Type] = 'text/plain'
    return response.setStatus(HttpStatusCode.OK).setHeaders(responseHeaders).setBody(echo)
})

const server = net.createServer((socket) => {
    console.log('Connection received')
    socket.setEncoding('utf8')

    socket.on('data', (data: string) => {
        const request = new HttpRequest(data)
        const response = Router.route(request)
        response.send(socket)
        socket.end()
    })
    
});

console.log("Starting HTTP server");

server.listen(4221, 'localhost', () => {
    console.log('Server is running on port 4221');
});