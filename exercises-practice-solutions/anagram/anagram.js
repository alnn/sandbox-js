'use strict';

function orderChars(str) {
    return str.split('').sort().join('');
}

module.exports = function(word) {
    this.word   = word.toLowerCase();
    this.chars  = orderChars(this.word);
};

module.exports.prototype.matches = function(list) {
    list = Array.isArray(list) ? list : [].slice.call(arguments);
    return list.filter(function(item) {
        item = item.toLowerCase();
        return this.chars === orderChars(item) && item !== this.word;
    }.bind(this));
};
