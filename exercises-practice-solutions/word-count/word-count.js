'use strict';

module.exports = function() {};
module.exports.prototype.count = function(phrase) {
    return phrase.trim().split(/\s+/g).reduce(function(prev, curr) {
        curr = curr.toLowerCase();
        prev[curr] = isNaN(prev[curr]) ? 1 : prev[curr] + 1;
        return prev;
    }, {});
};
