import http from 'http';
import app from './app';
import ip from 'ip';

const port = process.env.PORT || 80;
const server = http.createServer(app);

server.listen(port);

console.log(`${ip.address()}:${port}`);