'use strict';

module.exports = function(num) {
    var sequence = Array.apply(null, Array(num)).map(function(item, i) {return i + 1;}),
        result = [],
        prime;
    sequence[0] = null;
    while (prime = sequence.filter(function(e) {return e;}).shift()) {
        result.push(prime);
        for (var i = 1; i < sequence.length; i++) {
            if (sequence[i] % prime === 0) {
                sequence[i] = null;
            }
        }
    }
    return {
        primes: result
    };
};
