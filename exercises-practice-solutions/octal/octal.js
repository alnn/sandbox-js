'use strict';

class Octal {
    constructor(oct) {
        this.oct = !/[^0-7]/g.test(oct) && oct || '0';
    }
    toDecimal() {
        return this.oct.split('').reduce((sum, num, i) => {
            return sum + num * Math.pow(8, (this.oct.length - 1) - i);
        }, 0);
    }
}

module.exports = Octal;
