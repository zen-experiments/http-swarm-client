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
    "ml/54bf9b5e636d735fe10e0000/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "pl/54c8c2fe636d736595030100/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "sl/54bf9b5e636d735fe1240000/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "ll/54bf9b5e636d735fe1270000/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "w/54bf9b5e636d735fe12e0000/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "fll/54bf9b5e636d735fe1300000/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "jsi/55c9e81f636d731dd02a1b00/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "jsi/55eff848636d734306080000/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "jsi/56a70f597858775d4800001b/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "jsi/57147a647858772adc000049/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "t/54c8c2fe636d736595110100/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "w/54c8c2fe636d736595140100/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "ps/5614ebd9636d735640310900/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "wc/54c8c2fe636d7365951f0100/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "wc/54c8c2fe636d736595220100/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "wc/54c8c2fe636d736595240100/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "w/54c8c2fe636d736595260100/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "wc/54cde4c6636d733ed6940000/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}",
    "c/54c8c2fe636d7365951d0100/draft/1/eco/64/EN/0/www.local.top10antivirussoftware.com/1/_/8/1/_/1/{callback}"
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
