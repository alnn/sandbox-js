"use strict";

console.log('*****************OBSERVER*******************');
console.log('*****************EXAMPLE-1******************');

// Observer
var publisher = {
    subscribers: {
        any: []
    },
    subscribe: function(fn, type) {
        type = type || 'any';
        if (typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    },
    unsubscribe: function(fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function(publication, type) {
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function(action, arg, type) {
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;

        for (i = 0; i < max; i++) {
            if (action === 'publish') {
                subscribers[i](arg);
            } else {
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }

};

function makePublisher(o) {
    var i;

    for (i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
            o[i] = publisher[i];
        }
    }
    o.subscribers = {any: []};
}

var paper = {
    daily: function() {
        this.publish("big news today");
    },
    monthly: function() {
        this.publish("interesting analysis", "monthly");
    },
    readTweets: function(tweet) {
        console.log('Call big meeting! Someone ' + tweet);
    }
};

makePublisher(paper);

var joe = {
    drinkCoffee: function(paper) {
        console.log('Just read ' + paper)
    },
    sundayPreNap: function(monthly) {
        console.log('About to fall asleep reading this ' + monthly);
    },
    tweet: function(msg) {
        this.publish(msg);
    }
};

makePublisher(joe);

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');
joe.subscribe(paper.readTweets);

paper.daily();
paper.daily();
paper.daily();
paper.monthly();
joe.tweet("hated the paper today")

console.log('********************************************');

console.log('******************EXAMPLE-2*****************');

publisher = {
    subscribers: {
        any: []
    },
    on: function(type, fn, context) {
        type = type || 'any';
        fn = typeof fn === 'function' ? fn : context[fn];

        if (typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }

        this.subscribers[type].push({fn:fn, context: context || this});
    },
    remove: function(type, fn, context) {
        this.visitSubscribers('unsubscribe', type, fn, context);
    },
    fire: function(type, publication) {
        this.visitSubscribers('publish', type, publication);
    },
    visitSubscribers: function(action, type, arg, context) {
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers ? subscribers.length : 0;

        for (i = 0; i < max; i++) {
            if (action === 'publish') {
                subscribers[i].fn.call(subscribers[i].context, arg);
            } else {
                if (subscribers[i].fn === arg && subscribers[i].context === context) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};

function Player(name, key) {
    this.points = 0;
    this.name   = name;
    this.key    = key;
    this.fire('newplayer', this);
}

Player.prototype.play = function() {
    this.points++;
    this.fire('play', this);
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

        this.fire('scorechange', score);
    }
};

makePublisher(Player.prototype);
makePublisher(game);

Player.prototype.on('newplayer', 'addPlayer', game);
Player.prototype.on('play', 'handlePlay', game);
game.on('scorechange', scoreboard.update, scoreboard);
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
