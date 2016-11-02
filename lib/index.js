const prepare = require('./prepare');
const handle = require('./handle');

const urls = [
    '/1',
    '/2',
    '/3'
];

const options = {
    host: 'localhost',
    port: '4001'
};

const measure = function() {
    const precision = 3;
    const elapsed = process.hrtime(start);
    const duration = (elapsed[0] * 1e3) + (elapsed[1] / 1e6);

    console.log(`${duration}ms`);

    start = process.hrtime();
};

let start = process.hrtime();
measure();

handle(prepare(urls, options));
measure();
