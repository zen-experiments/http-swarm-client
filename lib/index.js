const Promise = require('bluebird');
const request = require('request-promise');

const handleSuccess = function(aggregator, component) {
    aggregator.push(component['54c8c2fe636d7365951d0100']);
    return aggregator;
};

const handleFailure = function(aggregator, err) {
    aggregator.push({render: '<div>Error</div>'});
    return aggregator;
};

const proc = function(urls, options) {
    const customRequest = request.defaults(options);

    return Promise.reduce(urls, (aggregator, url) => {
        return customRequest({url: url}).then((response) => {
            return handleSuccess(aggregator, response);
        }).catch((err) => {
            return handleFailure(aggregator, err);
        });
    }, []).finally(() => {
        // ???
    });
};

const render = function(components) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            const markup = components.reduce((container, component) => {
                return container + component.render;
            }, '<div>') + '<div>';

            resolve(markup);
        });
    });
}

module.exports = function(urls, options) {
    return proc(urls, options).then(render).catch(() => {
        // ???
    }).finally(() => {
        // ???
    });
};
