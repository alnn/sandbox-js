'use strict';

var types = {
    1: 'equilateral',
    2: 'isosceles',
    3: 'scalene'
};

module.exports = function(a, b, c) {
    return {
        kind: function() {
            var unique;
            if (!(Math.abs(a - b) < c && c < a + b)) {
                throw new Error('Triangle cannot exist');
            }

            unique = Object.keys([a, b, c].reduce(function(prev, curr) {
                prev[curr] = true;
                return prev;
            }, {}));

            return types[unique.length];
        }
    };
};
