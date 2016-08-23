'use strict';

var A_ASCII = 65,
    Z_ASCII = 90;

function Robot() {
    this.name = '';
    this.reset();
}

Robot.usedNames = [];

Robot.prototype.reset = function() {

    while (this.name = this.generateName()) {
        if (Robot.usedNames.indexOf(this.name) === -1) {
            Robot.usedNames.push(this.name);
            break;
        }
    }
};

Robot.prototype.generateName = function() {
    var randAscii,
        alpha = '',
        i = 0;

    for (; i < 2; i++) {
        randAscii = Math.floor(Math.random() * (Z_ASCII - A_ASCII + 1)) + A_ASCII;
        alpha += String.fromCharCode(randAscii);
    }

    return alpha + Math.random().toString().slice(-3);
};

module.exports = Robot;
