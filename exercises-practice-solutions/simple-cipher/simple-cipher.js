'use strict';

var shifter = function(str, key, dir) {
    return str.replace(/\w/g, function(char, i) {
        var s = (char.charCodeAt(0) - 97) + (key.charCodeAt(i) - 97) * dir;
        return  String.fromCharCode((s > 25 || s < 0 ? s - 26 * dir: s) + 97);
    });
};

module.exports = function(key) {
    if (undefined !== key && (/[^a-z]/g.test(key) || key.length === 0)) {
        throw new Error('Bad key');
    }

    key = key || Array.apply(null, Array(100)).map(function() {
        return String.fromCharCode(Math.floor(Math.random() * 24) + 97);
    }).join('');

    return {
        key: key,
        encode: function(str) {
            return shifter(str, this.key, 1);
        },
        decode: function(str) {
            return shifter(str, this.key, -1);
        }
    };
};
