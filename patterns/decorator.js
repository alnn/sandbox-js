"use strict";

console.log('*****************DECORATOR******************');

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
