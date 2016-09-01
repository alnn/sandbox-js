'use strict';

function getAddends(nums) {
    return nums.map((n, i, arr) => {
        n = +arr[i];
        i = (arr.length - 1) - i;
        n = (i + 1) % 2 === 0 ? n * 2 : n;
        return n >= 10 ? n - 9 : n;
    });
}

class Luhn {
    constructor(num) {
        this.addends = getAddends(num.toString().split(''));
        this.checksum = this.addends.reduce((prev, curr) => prev + curr, 0);
        this.checkDigit = this.addends.slice().pop();
        this.valid = this.checksum % 10 === 0
    }
    static create(num) {
        num *= 10;
        return num  + new Luhn(num).checksum * 9 % 10;
    }
}

module.exports = Luhn;