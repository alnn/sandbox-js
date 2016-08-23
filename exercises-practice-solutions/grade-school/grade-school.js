'use strict';

module.exports = function() {

    var data = [];

    return {
        add: function(name, grade) {
            data.push( new (function() {
                this.getName = function () {
                    return name;
                };
                this.getGrade = function(){
                    return grade;
                };
            }));
        },
        roster: function() {
            var result = {},
                grade;

            data.sort(function(a, b) {
                return a.getGrade() < b.getGrade();
            }).forEach(function(item, indx) {
                grade = item.getGrade();

                if (!result[grade]) {
                    result[grade] = [item.getName()];
                } else {
                    result[grade].push(item.getName());
                }
            });

            for (grade in result) {
                result[grade].sort();
            }

            return result;
        },
        grade: function(val) {
            return this.roster()[val] || [];
        }
    };
};
