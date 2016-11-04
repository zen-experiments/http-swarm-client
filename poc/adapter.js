const PATH = require('path');
const FS = require('fs');

const http2 = require('http2');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = 4001;

const CHART = FS.readFileSync(PATH.resolve(__dirname, './files/chart.html'), 'utf-8');

app.use(morgan('dev'));
app.use(compression());

app.get('/api(/)?*', (req, res) => {
    const random = Math.random(0, 1);

    if (random > 0.1) {
        res.status(200).send({
            '54c8c2fe636d7365951d0100': {
                css: [['{cdn}/bcss/jquery.qtip.min.v1.css'], ['{cdn}/bcss/font-awesome.v440.min.css']],
                error: null,
                instance_id: random,
                javascripts: [
                    ['{cdn}/javascript/callbox.v1.js', 'CB'],
                    ['{cdn}/javascript/jquery.tablesorter.v2221.min.js', 'jQuery.tablesorter']
                ],
                render: CHART,
                type: 'c'
            }
        });
    } else {
        res.status(500).send();
    }
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Listening on ${PORT}`);
    } else {
        console.log(err);
    }
});

// http2.createServer({
//     key: FS.readFileSync(PATH.resolve(__dirname, './key.pem')),
//     cert: FS.readFileSync(PATH.resolve(__dirname, './cert.pem'))
// }, app).listen(PORT, (err) => {
//     if (!err) {
//         console.log(`Listening on ${PORT}`);
//     } else {
//         console.log(err);
//     }
// });
