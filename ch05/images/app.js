const http = require('http');
const os = require('os');
const https = require('https');
const fs = require('fs');

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;
const serverLoop = function(request, response) {
    console.log("Received request from " + request.connection.remoteAddress);
    response.writeHead(200);
    const userAgent = request.headers["user-agent"];
    response.end(`Hello ${userAgent}!\nYou've hit ${os.hostname()}.\n`);
};

console.log(`Kubia server starting HTTP on port:${HTTP_PORT} ...`);
http.createServer(serverLoop).listen(HTTP_PORT);

console.log(`Kubia server starting HTTP on port:${HTTPS_PORT} ...`);
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
https.createServer(options, serverLoop).listen(HTTPS_PORT);