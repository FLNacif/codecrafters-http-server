import * as net from 'net';

const server = net.createServer((socket) => {
    socket.end();
});

console.log("Starting HTTP server");

server.listen(4221, 'localhost', () => {
    console.log('Server is running on port 4221');
});
