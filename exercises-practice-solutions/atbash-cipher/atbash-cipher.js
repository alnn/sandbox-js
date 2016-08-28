'use strict';
var A = 97,
    Z = 122;

exports.encode = function(str) {
    var i = 0,
        code;
    str = str.replace(/\W/g, '').toLowerCase();

    for (; i < str.length; i++) {
        code = str.charCodeAt(i);
        if (code >= A && code <= Z) {
            code = (26 - (code - A + 1)) + A;
            str =  str.substr(0, i) + String.fromCharCode(code) + str.substr(i + 1);
        }
    }

    return str.replace(/(\w{1,5})/g, '$1 ').trim();
};
