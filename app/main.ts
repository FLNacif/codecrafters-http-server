import * as net from 'net';
import { HttpResponse } from './http/model/http.response';
import { HttpRequest } from './http/model/http.request';
import { Router } from './router/router';
import { HttpStatusCode } from './http/model/http.statusCode';

Router.onGet('/', () => {
    return new HttpResponse(HttpStatusCode.OK)
})

Router.onGet('/user-agent', (request: HttpRequest) => {
    const userAgent = request.headers['User-Agent']
    return new HttpResponse(200, {'Content-Type': 'text/plain', 'Content-Length': userAgent.length}, userAgent)
})

Router.onGet('/echo/{echo}', (request: HttpRequest) => {
    const echo = request.getPathVariables('echo')
    return new HttpResponse(200, {'Content-Type': 'text/plain', 'Content-Length': echo.length}, echo)
})

const server = net.createServer((socket) => {
    console.log('Connection received')
    socket.setEncoding('utf8')

    socket.on('data', (data: string) => {
        // console.log(`Received data\n ${data}`)
        const request = new HttpRequest(data)
        const response = Router.route(request)
        socket.write(response.send())
        socket.end()
    })
    
});

console.log("Starting HTTP server");

server.listen(4221, 'localhost', () => {
    console.log('Server is running on port 4221');
});