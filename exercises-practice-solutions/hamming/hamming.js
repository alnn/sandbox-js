'use strict';

module.exports = function() {};
module.exports.prototype.compute = function(a, b) {
    if (a.length !== b.length ) {
        throw new Error('DNA strands must be of equal length.');
    }
    return a.split('').reduce(function(prev, cur, indx) {
        return b.charAt(indx) !== cur ? ++prev : prev;
    }, 0);
};
