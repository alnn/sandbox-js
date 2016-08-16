"use strict";

console.log('*****************OBSERVER - Event Emitter*******************');

var EventEmitter = function() {
    return {
        events: {},
        on: function(event, callback) {
            if ('undefined' === typeof this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        },
        emit: function(event) {
            var args = [].slice.call(arguments, 1);
            if (!this.events[event]) {
                return;
            }
            this.events[event].forEach(function(fn) {
                fn.apply(null, args);
            });
        },
        clean: function(event) {
            this.events[event] = [];
        }
    }
};

function makeEventEmitter(o) {
    var i, evntEmter  = EventEmitter();
    for (i in evntEmter) {
        if (evntEmter.hasOwnProperty(i)) {
            o[i] = evntEmter[i];
        }
    }
}

function Player(name, key) {
    this.points = 0;
    this.name   = name;
    this.key    = key;
    this.emit('newplayer', this);
}

Player.prototype.play = function() {
    this.points++;
    this.emit('play', this);
};

var scoreboard = {
    element: document.getElementById('results'),
    update: function(score) {
        var i, msg = '';

        for (i in score) {
            if (score.hasOwnProperty(i)) {
                msg += '<p><strong>' + i + '</strong>: ';
                msg += score[i];
                msg += '</p>';
            }
        }
        this.element.innerHTML = msg;
    }
};

var game = {
    keys: {},
    addPlayer: function(player) {
        var key = player.key.toString().charCodeAt(0);
        this.keys[key] = player;
    },
    handleKeypress: function(e) {
        e = e || window.event;
        if (game.keys[e.which]) {
            game.keys[e.which].play();
        }
    },
    handlePlay: function() {
        var i,
            players = this.keys,
            score = {},
            player;

        for (i in players) {
            if (players.hasOwnProperty(i)) {
                player = players[i];
                score[player.name] = player.points;
            }
        }

        this.emit('scorechange', score);
    }
};

makeEventEmitter(Player.prototype);
makeEventEmitter(game);

Player.prototype.on('newplayer', game.addPlayer.bind(game));
Player.prototype.on('play', game.handlePlay.bind(game));
game.on('scorechange', scoreboard.update.bind(scoreboard));

window.onkeypress = game.handleKeypress;

var playername, key;

while(true) {

    playername = prompt("Add player (name)");
    if (!playername) {
        break;
    }

    while (true){
        key = prompt("Key for " + playername + "?");
        if (key) {
            break;
        }
    }

    new Player(playername, key);
}

setTimeout(function() {
    window.onkeypress = null;
    alert('Game over!');
}, 20000);

console.log('********************************************');


