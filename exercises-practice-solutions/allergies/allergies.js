'use strict';
var allergens = [
    'eggs', 'peanuts', 'shellfish', 'strawberries',
    'tomatoes', 'chocolate', 'pollen', 'cats'
];

module.exports = function(score) {
    return {
        list: function() {
            return allergens.filter(function(a) {return this.allergicTo(a);}.bind(this));
        },
        allergicTo: function(allergen) {
            return !!(1 << allergens.indexOf(allergen) & score);
        }
    };
};
