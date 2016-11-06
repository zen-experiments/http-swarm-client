const Promise = require('bluebird');
const request = require('request-promise');

const handleSuccess = function(id, component) {
    return component;
};

const handleFailure = function(id, err) {
    return {
        [id]: {
            id: id,
            token: id,
            render: '<div>Error</div>'
        }
    };
};

const extractId = function(url) {
    const parts = url.match(/(.+?)\/(.+?)\/.*/);
    return parts[2];
};

const proc = function(urls, options) {
    const customRequest = request.defaults(options);

    return Promise.reduce(urls, (aggregator, url) => {
        const id = extractId(url);

        return customRequest({url: url}).then((response) => {
            const success = handleSuccess(id, response);
            aggregator.push(success);
            return aggregator;
        }).catch((err) => {
            const error = handleFailure(id, err);
            aggregator.push(error);
            return aggregator;
        });
    }, []).finally(() => {
        // ???
    });
};

const render = function(components) {
    console.log(components);
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            const markup = components.reduce((container, component) => {
                const componentData = Object.values(component)[0];
                const {token, render} = componentData;

                let result;

                if (token === null) {
                    result = container + render;
                } else {
                    result = container.replace(`{${token}}`, render);
                }

                return result;
            }, '');

            resolve(markup);
        });
    });
};

module.exports = function(urls, options) {
    return proc(urls, options).then(render).catch(() => {
        // ???
    }).finally(() => {
        // ???
    });
};
