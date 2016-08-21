'use strict';

function generatePermutations(str) {
    var len = str.length,
        i = 1,
        factorial = 1,
        result = [];

    for (; i <= len; i++) {
        factorial *= i;
    }

    i = 0;

    while (i < factorial) {
        var combinationPos = i,
            buff = str,
            charCount = len,
            combinations = factorial,
            anagram = "",
            charPos;

        for (; charCount > 0; charCount--) {
            combinations = combinations / charCount;
            charPos = Math.floor(combinationPos / combinations);
            combinationPos %= combinations;
            anagram += buff.charAt(charPos);
            buff = buff.substring(0, charPos) + buff.substring(charPos + 1);
        }
        i++;

        if (anagram !== str) {
            result.push(anagram);
        }
    }

    return result;
}

module.exports = function(word) {
    this.permutations = generatePermutations(word.toLowerCase());
};

module.exports.prototype.matches = function(list) {
    list = Array.isArray(list) ? list : [].slice.call(arguments);
    var _self = this;
    return list.filter(function(item) {
        return _self.permutations.indexOf(item.toLowerCase()) !== -1;
    });
};
