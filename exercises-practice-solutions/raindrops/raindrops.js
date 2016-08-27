'use strict';
var map = {3: 'i', 5: 'a', 7: 'o'};

module.exports = function() {
    return {
        convert: function(number) {
            var result = '', f;
            for (f in map) {
                result += !(number % f) ? 'Pl' + map[f] + 'ng' : '';
            }
            return result || number.toString();
        }
    };
};
