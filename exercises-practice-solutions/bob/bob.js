'use strict';

var Bob, answerCheckers;

answerCheckers = [
    function(message) {
        return /[a-z]/gi.test(message) && message.toUpperCase() === message ? 'Whoa, chill out!': false;
    },
    function(message) {
        return message.charAt(message.length - 1) === '?' ? 'Sure.' : false;
    },
    function(message) {
        return message.trim().length === 0 ? 'Fine. Be that way!' : false;
    },
    function(message) {
        return 'Whatever.';
    },
];

Bob = function() {};

Bob.prototype.hey = function(input) {
    var i,
        len = answerCheckers.length,
        answer;

    for (i = 0; i < len; i++) {
        answer = answerCheckers[i](input);
        if (answer) {
            return answer;
        }
    }
};

module.exports = Bob;
