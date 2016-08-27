'use strict';

function Binary(str) {
    this.str = str;
}

Binary.prototype.toDecimal = function() {
    return /[^01]/g.test(this.str) ? 0 : this.str.split('').reverse().reduce(function(prev, curr, index) {
        return prev + curr * Math.pow(2, index);
    }, 0);
};

module.exports = Binary;
