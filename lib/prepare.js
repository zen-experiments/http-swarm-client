const Promise = require('bluebird');
const request = require('request-promise');

module.exports = function(urls, options) {
    const {baseUrl = 'http://localhost:8080'} = options;
    const requests = urls.map(url => {
        return request({
            url: url,
            baseUrl: baseUrl,
            json: true
        });
    });

    return Promise.all(requests);
};
