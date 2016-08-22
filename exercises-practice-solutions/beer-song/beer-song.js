'use strict';

var BeerSong = function() {};

BeerSong.verseTpl = 'what where, what.\ntodo, what where.\n';
BeerSong.gotoTpl  = 'Go to the store and buy some more';

BeerSong.action = {
    what: function(quantity) {
        var called = this.what.called++;
        return {
            nomore: 'no more',
            prepare:[
                function() {
                    return quantity || this.nomore.charAt(0).toUpperCase() + this.nomore.slice(1);
                },
                function() {
                    return quantity || this.nomore;
                },
                function() {
                    return quantity === 1 ? this.nomore : quantity && (quantity - 1) || 99;
                },
            ],
            toString: function() {
                var prepared = this.prepare[called].bind(this)(),
                    suffix = prepared === 1 ? '' : 's';
                return  prepared + ' bottle' + suffix + ' of beer';
            },
        };
    },
    where: function(quantity) {
        return 'on the wall';
    },
    todo: function(quantity) {
        if (!quantity) {
            return BeerSong.gotoTpl;
        }
        var itOrOne = quantity === 1 ? 'it' : 'one';
        return 'Take ' + itOrOne + ' down and pass it around';
    }
};

BeerSong.prototype.verse = function(num) {
    BeerSong.action.what.called = 0;
    return BeerSong.verseTpl.replace(/\w+/g, function(match) {
        return BeerSong.action[match](num);
    });
};

BeerSong.prototype.sing = function(from, to) {
    var i, verses = [];
    to = to || 0;
    for (; from >= to; from--) {
        verses.push(this.verse(from));
    }
    return verses.join('\n');
};

module.exports = BeerSong;
