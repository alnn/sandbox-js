'use strict';

var LETTERS_SCORES = {AEIOULNRST: 1, DG: 2, BCMP: 3, FHVWY: 4, K: 5, JX: 8, QZ: 10};

module.exports = function(word) {
    var letterSet, score = 0, matches;
    for (letterSet in LETTERS_SCORES) {
        if (word && (matches = word.match(new RegExp('[' + letterSet + ']', 'gi')))) {
            score += LETTERS_SCORES[letterSet] * matches.length;
        }
    }
    return score;
};
