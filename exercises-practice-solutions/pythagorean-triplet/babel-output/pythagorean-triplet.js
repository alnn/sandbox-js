"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triplet = (function () {
    function Triplet() {
        _classCallCheck(this, Triplet);

        for (var _len = arguments.length, sides = Array(_len), _key = 0; _key < _len; _key++) {
            sides[_key] = arguments[_key];
        }

        this.sides = sides;
    }

    _createClass(Triplet, [{
        key: "sum",
        value: function sum() {
            return this.sides.reduce(function (p, c) {
                return p + c;
            }, 0);
        }
    }, {
        key: "product",
        value: function product() {
            return this.sides.reduce(function (p, c) {
                return p * c;
            }, 1);
        }
    }, {
        key: "isPythagorean",
        value: function isPythagorean() {
            return Math.pow(this.sides[0], 2) + Math.pow(this.sides[1], 2) === Math.pow(this.sides[2], 2);
        }
    }], [{
        key: "where",
        value: function where(cond) {
            var result = [];

            for (var a = cond.minFactor || 1; a < cond.maxFactor - 1; a++) {
                for (var b = a + 1; b < cond.maxFactor; b++) {
                    for (var c = b + 1; c < cond.maxFactor + 1; c++) {
                        var t = new Triplet(a, b, c),
                            validSum = t.sum() === cond.sum || !cond.sum;
                        if (t.isPythagorean() && validSum) {
                            result.push(t);
                        }
                    }
                }
            }

            return result;
        }
    }]);

    return Triplet;
})();

exports["default"] = Triplet;
module.exports = exports["default"];