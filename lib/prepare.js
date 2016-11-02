const fetch = require('node-fetch');

module.exports = function(urls, options) {
    return urls.map((url) => {
        const {protocol = 'http', host = 'localhost', port = '8080'} = options;
        const absoluteUrl = `${protocol}://${host}:${port}${url}`;

        return fetch(absoluteUrl, options);
    });
};
