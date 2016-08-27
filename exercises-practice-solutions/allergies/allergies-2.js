'use strict';

var allergens = [
        'eggs', 'peanuts', 'shellfish', 'strawberries',
        'tomatoes', 'chocolate', 'pollen', 'cats'
    ],
    total = allergens.length;

module.exports = function(score) {
    var bitMap = ('0'.repeat(total) + score.toString(2)).slice(-total);
    return {
        list: function() {
            return bitMap.split('').reverse().map(function(bit, i) {
                return bit === '1' ? allergens[i] : undefined;
            }).filter(function(item) {return item;});
        },
        allergicTo: function(allergen) {
            var index = (total - 1) - allergens.indexOf(allergen);
            return bitMap.charAt(index) === '1';
        }
    };
};
