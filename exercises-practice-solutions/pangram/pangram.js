'use strict';

module.exports  = function(sentence) {
    this.isPangram = function() {
        return sentence.replace(/[^a-z]|(.)(?=.*\1)/gi, '').length === 26;
    };
};
