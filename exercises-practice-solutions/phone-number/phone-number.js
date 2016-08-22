'use strict';

var PhoneNumber = function(phone) {
    this.phone = phone;
};

PhoneNumber.cleanup = function(num){
    num = num.replace(/[^\d+]/g, '');
    return num.length === 11 && num.charAt(0) == 1 ? num.slice(1): num;
}

PhoneNumber.prototype.number = function() {
    var num = PhoneNumber.cleanup(this.phone);
    return num.length === 10 ? num :'0000000000';
};

PhoneNumber.prototype.areaCode = function() {
    return this.number().slice(0, 3);
};

PhoneNumber.prototype.toString = function() {
    return this.number().replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3');
}

module.exports = PhoneNumber;
