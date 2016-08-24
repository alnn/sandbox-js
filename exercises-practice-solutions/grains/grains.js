'use strict';
var BigInt = require('./big-integer');

module.exports = function() {
    return {
        square: function(num) {
            return BigInt(2).pow(num - 1).toString();
        },
        total: function() {
            return BigInt(2).pow(64).minus(1).toString();
        }
    };
};
