'use strict';

var map = {
    1: 'I', 4: 'IV', 5: 'V', 9: 'IX', 10: 'X',
    40: 'XL', 50: 'L', 90: 'XC', 100: 'C', 400: 'CD',
    500: 'D', 900: 'CM', 1000: 'M'
};

module.exports = function(decimal) {
    var romans = '',
        nums = Object.keys(map),
        i = nums.length;

    while (i >= 0) {
        if (decimal >= nums[i]) {
            romans += map[nums[i]];
            decimal -= nums[i];
        } else {
            i--;
        }
    }

    return romans;
};