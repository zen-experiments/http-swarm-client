const prepare = require('./prepare');
const combine = require('./combine');
const report = require('./report');
const measure = require('./measure');

const urls = [
    'request1',
    'request2',
    'request3',
    'request4',
    'request5',
    'request6',
    'request7',
    'request8',
    'request9',
    'request10',
    'request11',
    'request12',
    'request13',
    'request14',
    'request15',
    'request16',
    'request17',
    'request18',
    'request19',
    'request20',
    'request21',
    'request22',
    'request23',
    'request24',
    'request25',
    'request26',
    'request27',
    'request28',
    'request29',
    'request30',
];

const options = {
    baseUrl: 'http://localhost:4001/api'
};

// prepare(urls, options)
//     .then(combine)
//     .then(report)
//     .catch(Promise.AggregateError, (errs) => {
//         if (errs) {
//             errs.forEach(function(err) {
//                 console.error(err);
//             });
//         }
//     });

const Promise = require('bluebird');
const request = require('request-promise');

const {baseUrl = 'http://localhost:8080'} = options;
const customRequest = request.defaults({
    baseUrl: baseUrl,
    json: true,
    pool: {
        maxSockets: Infinity
    }
});

process.start = process.hrtime();

const requests = urls.map(url => {
    return customRequest({
        url: url
    }).catch((err) => {
        return {
            '54c8c2fe636d7365951d0100': {
                instance_id: err.message
            }
        };
    });
});

Promise.all(requests).then((components) => {
    return components.reduce((aggregator, component) => {
        aggregator.push(component['54c8c2fe636d7365951d0100'].instance_id);
        return aggregator;
    }, []);
}).then((result) => {
    console.log('------------------------------');
    measure('then');
    // console.log(result);
}).catch((err) => {
    measure('error');
    // console.log(err);
}).then(() => {
    measure('finally');
});

Promise.reduce(urls.slice(0, 1), (aggregator, url) => {
    return customRequest({
        url: url
    }).then((component) => {
        aggregator.push(component['54c8c2fe636d7365951d0100'].instance_id);
        return aggregator;
    }).catch((err) => {
        aggregator.push(err.message);
        return aggregator;
    });
}, []).then((result) => {
    console.log('------------------------------');
    measure('then');
    // console.log(result);
}).catch((err) => {
    console.log(err);
    // measure('error');
}).finally(() => {
    measure('finally');
});

// Promise.reduce(urls, (aggregator, url) => {
//     return request({url: url, baseUrl: baseUrl, json: true}).then((component) => {
//         aggregator.push(component['54c8c2fe636d7365951d0100'].instance_id);
//         measure(component['54c8c2fe636d7365951d0100'].instance_id);
//         return aggregator;
//     }).catch(err => {
//         aggregator.push(err.message);
//         measure('ERROR');
//         return aggregator;
//     });
// }, []).then(result => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// }).finally(() => {
//     measure('total');
// });
