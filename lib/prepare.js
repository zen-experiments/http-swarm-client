const request = require("request-promise");

module.exports = function(urls, options) {
    const {baseUrl = 'http://localhost:8080'} = options;

    return urls.map(url => request({
        url: url,
        baseUrl: baseUrl,
        json: true
    }));
};
