'use strict';

var FoodChain = function() {};

FoodChain.food = {
    fly: 'I don\'t know why she swallowed the fly. Perhaps she\'ll die.',
    spider: 'It wriggled and jiggled and tickled inside her.',
    bird: 'How absurd to swallow a bird!',
    cat: 'Imagine that, to swallow a cat!',
    dog: 'What a hog, to swallow a dog!',
    goat: 'Just opened her throat and swallowed a goat!',
    cow: 'I don\'t know how she swallowed a cow!',
    horse: 'She\'s dead, of course!'
};

FoodChain.prototype.verse = function(num) {
    var rows = [],
        animals = Object.keys(FoodChain.food),
        versesQty = animals.length,
        currAnimal,
        prevAnimal,
        lastRowPos = versesQty === num ? versesQty - 1: 0,
        pos = num - 1;

    rows.push('I know an old lady who swallowed a food.'.replace('food', animals[pos]));

    if (pos > lastRowPos) {
        rows.push(FoodChain.food[animals[pos]]);
        for (; pos > 0; pos--) {
            currAnimal = animals[pos];
            prevAnimal = animals[pos - 1];
            if (prevAnimal === 'spider') {
                prevAnimal += FoodChain.food[prevAnimal].replace('It', ' that').replace('.', '');
            }
            rows.push('She swallowed the ' + currAnimal + ' to catch the ' + prevAnimal +'.');
        }
    }

    rows.push(FoodChain.food[animals[lastRowPos]]);

    return rows.join('\n') + '\n';
};

FoodChain.prototype.verses = function(from, to) {
    var couplets = [];
    for (; from <= to; from++) {
        couplets.push(this.verse(from));
    }
    return couplets.join('\n') + '\n';
};

module.exports = FoodChain;
