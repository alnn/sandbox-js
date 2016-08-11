"use strict";

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

// FABRIC
function CarMaker() {}

CarMaker.prototype.drive = function() {
    return "Vroom, I have " + this.doors + " doors";
};

CarMaker.factory = function(type) {
    var constr = type,
        newcar;

    if (typeof CarMaker[constr] !== "function") {
        throw {
            name: "Error",
            message: constr + " doesn't exist"
        };
    }

    if (typeof CarMaker[constr].prototype.drive !== "function") {
        CarMaker[constr].prototype = new CarMaker();
    }

    newcar = new CarMaker[constr]();
    return newcar;
};

CarMaker.Compact = function() {
    this.doors = 4;
};

CarMaker.Convertible = function() {
    this.doors = 2;
};

CarMaker.SUV = function() {
    this.doors = 24;
};

var corolla     = CarMaker.factory('Compact');
var solstice    = CarMaker.factory('Convertible');
var cherokee    = CarMaker.factory('SUV');

console.log(corolla.drive());
console.log(solstice.drive());
console.log(cherokee.drive());

console.log('********************************************');

// ITERATOR
var agg = (function() {
    var index   = 0,
        data    = [1, 2, 3, 4, 5],
        length  = data.length;

    return {
        next: function() {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[index];
            index   = index + 2;
            return element;
        },
        hasNext: function() {
            return index < length;
        },
        rewind: function() {
            index = 0;
        },
        current: function() {
            return data[index];
        }
    }

}());

while (agg.hasNext()) {
    console.log(agg.next());
}

agg.rewind();
console.log(agg.current());

console.log('********************************************');

// DECORATOR
// 1
function Sale(price) {
    this.price = price || 100;
}

Sale.prototype.decorate = function(decorator) {
    var F = function() {},
        overrides = this.constructor.decorators[decorator],
        i, newobj;
    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;
    for (i in overrides) {
        if (overrides.hasOwnProperty(i)) {
            newobj[i] = overrides[i];
        }
    }
    return newobj;
};

Sale.prototype.getPrice = function() {
    return this.price;
};

Sale.decorators = {};

Sale.decorators.fedtax = {
    getPrice: function() {
        var price = this.uber.getPrice();
        price += price * 5 / 100;
        return price;
    }
};

Sale.decorators.quebec = {
    getPrice: function() {
        var price = this.uber.getPrice();
        price += price * 7.5 / 100;
        return price;
    }
};

Sale.decorators.money = {
    getPrice: function() {
        return "$ " + this.uber.getPrice().toFixed(2);
    }
};

Sale.decorators.cdn = {
    getPrice: function() {
        return "CDN$ " + this.uber.getPrice().toFixed(2);
    }
};

var sale = new Sale(100);
sale = sale.decorate('fedtax');
sale = sale.decorate('quebec');
sale = sale.decorate('money');
console.log(sale.getPrice());

var sale = new Sale(100);
sale = sale.decorate('fedtax');
sale = sale.decorate('cdn');
console.log(sale.getPrice());

// 2
function SaleList(price) {
    this.price = (price > 0) ? price : 100;
    this.decorators_list = [];
}

SaleList.prototype.decorate = function(decorator) {
    this.decorators_list.push(decorator);
};

SaleList.prototype.getPrice = function() {
    var price = this.price,
        i,
        max = this.decorators_list.length,
        name;
    for (i = 0; i < max; i++) {
        name = this.decorators_list[i];
        price = SaleList.decorators[name].getPrice(price);
    }
    return price;
};

SaleList.decorators = {};

SaleList.decorators.fedtax = {
    getPrice: function(price) {
        return price + price * 5 / 100;
    }
};

SaleList.decorators.quebec = {
    getPrice: function(price) {
        return price + price * 7.5 / 100;
    }
};

SaleList.decorators.money = {
    getPrice: function(price) {
        return "$ " + price.toFixed(2);
    }
};

SaleList.decorators.cdn = {
    getPrice: function(price) {
        return "CDN$ " + price.toFixed(2);
    }
};

var saleLst = new SaleList(100);
saleLst.decorate('fedtax');
saleLst.decorate('quebec');
saleLst.decorate('money');
console.log(saleLst.getPrice());

console.log('********************************************');

//STRATEGY
var validator = {
    types: {},
    messages: [],
    config: {},
    validate: function(data) {
        var i, msg, type, checker, result_ok;

        this.messages = [];

        for (i in data) {
            if (!data.hasOwnProperty(i)) {
                continue;
            }
            type = this.config[i];
            checker = this.types[type];

            if (!type) {
                continue;
            }

            if (!checker) {
                throw {
                    name: "ValidationError",
                    message: "No handler to validate type " + type
                };
            }

            result_ok = checker.validate(data[i]);
            if (!result_ok) {
                msg = "Invalid value for *" + i + "*, " + checker.instructions;
                this.messages.push(msg);
            }
        }
        return this.hasErrors();
    },
    hasErrors: function() {
        return this.messages.length !== 0;
    }
};

validator.types.isNonEmpty = {
    validate: function(value) {
        return value !== "";
    },
    instructions: "the value cannot be empty"
};

validator.types.isNumber = {
    validate: function(value) {
        return !isNaN(value);
    },
    instructions: "the value can only be a valid number, e.g. 1, 3.14 or 222"
};

validator.types.isAlphaNum = {
    validate: function(value) {
        return !/[^a-z0-9]/i.test(value);
    },
    instructions: "the value can only contain characters and numbers, no special symbols"
};

validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};

var data = {
    first_name: "Super",
    last_name: "Man",
    age: "unknown",
    username: "o_O'"
};

validator.validate(data);
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
}

console.log('********************************************');

//FACADE
var myEvent = {
    // ...
    stop: function(e) {
        // IE
        if (typeof e.returnValue === "boolean") {
            e.returnValue = false;
        }
        if (typeof e.cancelBubble === "boolean") {
            e.cancelBubble = true;
        }
        // Others
        if (typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
            e.stopPropagation();
        }
    }
};

console.log('********************************************');

//PROXY
var $ = function(id) {
    return document.getElementById(id);
};

$('vids').onclick = function(e) {
    var src, id;

    e = e || window.event;
    src = e.target || e.srcElement;

    if (src.nodeName !== "A") {
        return;
    }

    if (typeof e.preventDefault === "function") {
        e.preventDefault();
    }
    e.returnValue = false;

    id = src.href.split('--')[1];

    if (src.className === "play") {
        src.parentNode.innerHTML = videos.getPlayer(id);
        return;
    }

    src.parentNode.id = "v" + id;
    videos.getInfo(id);
};

$('toggle-all').onclick = function(e) {

    var hrefs,
        i,
        max,
        id;

    hrefs = $('vids').getElementsByTagName('a');
    for (i = 0, max = hrefs.length; i < max; i++) {

        if (hrefs[i].className === "play") {
            continue;
        }

        if (!hrefs[i].parentNode.firstChild.checked) {
            continue;
        }

        id = hrefs[i].href.split('--')[1];
        hrefs[i].parentNode.id = "v" + id;
        videos.getInfo(id);
    }

};

var videos = {
    getPlayer: function(id) {},
    updateList: function(data) {},

    getInfo: function(id) {

        var info = $('info' + id);

        if (!info) {
            //http.makeRequest([id], "videos.updateList");
            proxy.makeRequest(id, videos.updateList, videos);
            return;
        }

        if (info.style.display === "none") {
            info.style.display = '';
        } else {
            info.style.display = 'none';
        }

    }
};

var http = {
    makeRequest: function(ids, callback) {
        var url = 'http://query.yahooapis.com/v1/public/yql?q=',
            sql = 'select * from music.video.id where ids IN ("%ID%")',
            format = 'format=json',
            handler = 'callback=' + callback,
            script = document.createElement('script');

        sql = sql.replace('%ID%', ids.join('","'));
        sql = encodeURIComponent(sql);

        url += sql + '&' + format + '&' + handler;
        script.src = url;

        document.body.appendChild(script);
    }
};

var proxy = {
    ids: [],
    delay: 50,
    timeout: null,
    callback: null,
    context: null,
    makeRequest: function(id, callback, context) {

        this.ids.push(id);

        this.callback   = callback;
        this.context    = context;

        if (!this.timeout) {
            this.timeout = setTimeout(function() {
                proxy.flush();
            }, this.delay);
        }
    },
    flush: function() {

        http.makeRequest(this.ids, "proxy.handler");

        this.timeout = null;
        this.ids     = [];

    },
    handler: function(data) {
        var i, max;

        if (parseInt(data.query.count, 10) === 1) {
            proxy.callback.call(proxy.context, data.query.results.Video);
        }

        for (i = 0, max = data.query.results.Video.length; i < max; i++) {
            proxy.callback.call(proxy.context, data.query.results.Video[i]);
        }

    }
};

console.log('********************************************');

//MEDIATOR
function Player(name) {
    this.points = 0;
    this.name = name;
}
Player.prototype.play = function() {
    this.points += 1;
    mediator.played();
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

var mediator = {
    players: {},
    setup: function() {
        var players = this.players;
        players.home = new Player('Home');
        players.guest = new Player('Guest');
    },
    played: function() {
        var players = this.players,
            score = {
                Home: players.home.points,
                Guest: players.guest.points
            };

        scoreboard.update(score);
    },
    keypress: function(e) {
        e = e || window.event;
        if (e.which === 49) {
            console.log('player Home playing');
            mediator.players.home.play();
            return;
        }

        if (e.which === 48) {
            console.log('player Guest playing');
            mediator.players.guest.play();
            return;
        }
    }
};

mediator.setup();
window.onkeypress = mediator.keypress;

setTimeout(function() {
    window.onkeypress = null;
    //alert('Game over!');
    console.log('Game over!');
}, 30000);

console.log('********************************************');

// Observer






















