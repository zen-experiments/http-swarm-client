const bluebird = require("bluebird");
const measure = require('./measure');

module.exports = function(promises) {
    bluebird.all(promises).then((resArr) => {
        const markup = resArr.reduce((str, res) => {
            const obj = res['54c8c2fe636d7365951d0100'];
            return str + obj.render;
        }, '<div>') + '</div>';

        measure();
    }).catch((err) => {
        console.log(err);
    })
};
