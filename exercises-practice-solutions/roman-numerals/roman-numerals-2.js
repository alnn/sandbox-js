'use strict';

var posMap = {
    0: 'IV',
    1: 'XL',
    2: 'CD',
    3: 'M'
};

module.exports = function(decimal) {
    return (decimal + '').split('').reverse().map(function(digit, indx, arr) {
        digit = +digit;
        if (digit === 0) {
            return '';
        }

        if (digit < 4) {
            return Array(digit).fill(posMap[indx].charAt(0)).join('');
        }
        if (digit === 4) {
            return posMap[indx].charAt(0) + posMap[indx].charAt(1);
        }
        if (digit === 5) {
            return posMap[indx].charAt(1);
        }
        if (digit === 9) {
            return posMap[indx].charAt(0) + posMap[indx + 1].charAt(0);
        }

        return posMap[indx].charAt(1) + Array(digit - 5).fill(posMap[indx].charAt(0)).join('');
    }).reverse().join('');
};
