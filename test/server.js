const http = require('http');
const PORT = 4001;

const handleRequest = function(req, res) {
    const random = Math.random(0, 1);

    if (req.url !== '/favicon.ico') {
        if (random > 0.2) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(`${random}`);
        } else {
            res.writeHead(500);
            res.end();
        }
    } else {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end();
    }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
