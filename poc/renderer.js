const PATH = require('path');
const FS = require('fs');

const http2 = require('http2');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const request = require('request-promise');

const app = express();
const PORT = 6001;
const CONSTRUCTOR_URL = 'http://localhost:5001';

const URLS = [
    '/api/render/request1',
    '/api/render/request2',
    '/api/render/request3',
    '/api/render/request4',
    '/api/render/request5',
    '/api/render/request6',
    '/api/render/request7',
    '/api/render/request8',
    '/api/render/request9',
    '/api/render/request10',
    '/api/render/request11',
    '/api/render/request12',
    '/api/render/request13',
    '/api/render/request14',
    '/api/render/request15',
    '/api/render/request16',
    '/api/render/request17',
    '/api/render/request18',
    '/api/render/request19',
    '/api/render/request20',
    '/api/render/request21',
    '/api/render/request22',
    '/api/render/request23',
    '/api/render/request24',
    '/api/render/request25',
    '/api/render/request26',
    '/api/render/request27',
    '/api/render/request28',
    '/api/render/request29',
    '/api/render/request30',
];

const customRequest = request.defaults({
    baseUrl: CONSTRUCTOR_URL,
    json: true,
    pool: {
        maxSockets: Infinity
    }
});

app.use(morgan('dev'));
app.use(compression());

app.get('/', (req, res) => {
    customRequest({
        method: 'POST',
        url: '/construct',
        body: URLS
    }).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Listening on ${PORT}`);
    } else {
        console.log(err);
    }
});
