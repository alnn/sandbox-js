'use strict';

module.exports = function(trinary) {
    return {
        toDecimal: function() {
            return !/[^012]/g.test(trinary) ? trinary.split('').reduce(function(prev, curr, i) {
                return prev + curr * Math.pow(3, trinary.length - (i + 1));
            }, 0) : 0;
        }
    };
};
