"use strict";

console.log('********************SINGLETON*******************');

// SINGLETONE
var Singleton = (function() {
    var instance;
    return function () {
        if (instance) {
            return instance;
        }
        instance = this;
        instance.name = 'single';
    }
}());

var a = new Singleton();
var b = new Singleton();

b.name = 'b';

console.log(a);
console.log(b);

function Universe() {

    var instance    = this;

    this.start_time = 0;
    this.bang       = "Big";

    Universe = function() {
        return instance;
    }

}

var u1 = new Universe();
var u2 = new Universe();

console.log(u1 === u2);

console.log('********************************************');
