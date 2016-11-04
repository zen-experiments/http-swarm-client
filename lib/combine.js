const Promise = require('bluebird');

module.exports = function(components) {
    console.log(typeof components);
    const rejected = components.filter((component) => {
        console.log(component);
        return component.isRejected();
    });
    console.log(rejected);

    // const markup = components.reduce((str, component) => {
    //     const obj = component['54c8c2fe636d7365951d0100'];
    //     return str + obj.render;
    // }, '<div>') + '</div>';

    // return Promise.resolve(markup);
};
