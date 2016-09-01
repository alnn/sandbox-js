'use strict';

module.exports = new class PigLatin {
    translate(phrase) {
        return phrase.replace(/\w+/g, word => {
            return word.replace(/^(.?qu|[^aeiou]+)?(\w+)$/, '$2$1ay');
        });
    }
}
