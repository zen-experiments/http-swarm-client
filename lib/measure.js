module.exports = function(label) {
    const precision = 3;
    const elapsed = process.hrtime(process.start);
    const duration = (elapsed[0] * 1e3) + (elapsed[1] / 1e6);

    console.log(`${label}: ${duration}ms`);

    process.start = process.hrtime();
};
