'use strict';

module.exports = {
    keep: function(arr, f, inverse) {
        var i = 0,
            len = arr.length,
            result = [];
        for (; i < len; i++) {
            if (inverse ? !f(arr[i]) : f(arr[i])) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    discard: function(arr, f) {
        return this.keep(arr, f, true);
    }
};
