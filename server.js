const http = require('http');

const port = process.evn.PORT || 3000;

const server = http.createServer();

server.listen(port);

