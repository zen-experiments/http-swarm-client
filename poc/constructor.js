const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');

const construct = require('../lib/');

const app = express();
const PORT = 5001;
const ADAPTER_URL = 'http://localhost:4001';

const OPTIONS = {
    baseUrl: ADAPTER_URL,
    json: true,
    pool: {
        maxSockets: Infinity
    }
};

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());

app.post('/construct(/)?*', (req, res) => {
    const {body} = req;
    construct(body, OPTIONS).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
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
