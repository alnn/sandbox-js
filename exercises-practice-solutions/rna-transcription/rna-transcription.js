'use strict';

var relation = {
    A: 'U',
    C: 'G',
    G: 'C',
    T: 'A'
};

module.exports = function() {};

module.exports.prototype.toRna = function(dnaStrand) {

    var regExp = new RegExp(Object.keys(relation).join("|"), 'g');

    return dnaStrand.replace(regExp, function(match) {
        return relation[match];
    });
};
