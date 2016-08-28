'use strict';

module.exports = function(arr, f) {
    var len = arr.length,
        res = new Array(len);
    while(len--) {
        res[len] = f(arr[len]);
    }
    return res;
};
