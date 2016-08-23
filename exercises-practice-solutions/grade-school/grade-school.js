'use strict';

var School = function() {

    var data = [];

    this.getData = function() {
        return data;
    };

    this.addData = function(val) {
        data.push(val);
    };

};

School.prototype.add = function(name, grade) {
    this.addData( new (function() {
        this.getName = function () {
            return name;
        };
        this.getGrade = function(){
            return grade;
        };
    }));
};

School.prototype.roster = function() {
    var result = {},
        grade;

    this.getData().sort(function(a, b) {
        return a.getGrade() < b.getGrade();
    }).forEach(function(item, indx) {
        grade = item.getGrade();

        if (!result[grade]) {
            result[grade] = [];
        }

        result[grade].push(item.getName());
    });

    for (grade in result) {
        result[grade].sort();
    }

    return result;
};

School.prototype.grade = function(val) {
    var result = this.roster();
    return result[val] || [];
};

module.exports = School;
