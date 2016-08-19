'use strict';

module.exports = {
    parse: function(string) {
        return string.replace(/([A-Z]+)/g, " $1").trim().split(/(?: |-)+/).map(function(word) {
            return word[0];
        }).join('').toUpperCase();
    }
};
