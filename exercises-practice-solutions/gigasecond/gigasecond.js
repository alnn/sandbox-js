'use strict';

module.exports = function(date) {
    this.time = date.getTime();
};

module.exports.prototype.date = function() {
    return new Date(this.time + Math.pow(10, 12));
};
