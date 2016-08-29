'use strict';

module.exports = function(phrase) {
    phrase = phrase.replace(/\W/g, '').toLowerCase();
    return {
        normalizePlaintext: function() {
            return phrase;
        },
        size: function() {
            return Math.ceil(Math.sqrt(phrase.length));
        },
        plaintextSegments: function() {
            return phrase.match( RegExp('\\w{1,' + this.size() + '}', 'g') );
        },
        ciphertext: function() {
            var seg = this.plaintextSegments(),
                cols = this.size(),
                pos = cols + 1,
                res = [], i, str;

            while (pos--) {
                str = '';
                for (i in seg) {
                    str += seg[i].charAt(cols - pos);
                }
                res.push(str);
            }

            return res.join('');
        }
    };
};
