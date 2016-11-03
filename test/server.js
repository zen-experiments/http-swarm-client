const HTTP = require('http');
const FS = require('fs');
const PATH = require('path');

const chart = FS.readFileSync(PATH.resolve(__dirname, './files/chart.html'), 'utf-8');

console.log(chart);

const PORT = 4001;

const handleRequest = function(req, res) {
    const random = Math.random(0, 1);

    if (req.url !== '/favicon.ico') {
        setTimeout(() => {
            if (random <= 1) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    '54c8c2fe636d7365951d0100': {
                        css: [['{cdn}/bcss/jquery.qtip.min.v1.css'], ['{cdn}/bcss/font-awesome.v440.min.css']],
                        error: null,
                        instance_id: '23d1e0538f540df808d31699d60ef84b',
                        javascripts: [
                            ['{cdn}/javascript/callbox.v1.js', 'CB'],
                            ['{cdn}/javascript/jquery.tablesorter.v2221.min.js', 'jQuery.tablesorter']
                        ],
                        render: chart,
                        type: 'c'
                    }
                }));
            } else {
                res.writeHead(500);
                res.end();
            }
        }, 500);
    } else {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end();
    }
}

const server = HTTP.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
