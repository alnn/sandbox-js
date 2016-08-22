'use strict';
var year;

module.exports = function(y) {
    year = y;
};

module.exports.prototype.isLeap = function() {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};
