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
