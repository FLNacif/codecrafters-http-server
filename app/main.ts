import * as net from 'net';
import { HttpResponse } from './http/model/http.response';

const server = net.createServer((socket) => {
    console.log('Connection received')
    socket.write(new HttpResponse(200).send())
    socket.end()
});

console.log("Starting HTTP server");

server.listen(4221, 'localhost', () => {
    console.log('Server is running on port 4221');
});