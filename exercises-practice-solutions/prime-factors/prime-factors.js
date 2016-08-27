'use strict';

module.exports = {
    for: function(num) {
        var result = [],
            primeFactor = 2;
        while (num > 1) {
            if (num % primeFactor > 0) {
                primeFactor++;
            } else {
                num = num / primeFactor;
                result.push(primeFactor);
            }
        }
        return result;
    }
};
