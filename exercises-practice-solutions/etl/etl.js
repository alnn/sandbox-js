'use strict';

module.exports = function() {
    return {
        transform: function(dataSet) {
            var score,
                result = {};
            for (score in dataSet) {
                dataSet[score].forEach(function(item) {
                    result[item.toLowerCase()] = +score;
                });
            }
            return result;
        }
    };
};
