'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _default = (function () {
  function _default(digits) {
    _classCallCheck(this, _default);

    this.digits = [].concat(_toConsumableArray(digits)).map(Number);
  }

  _createClass(_default, [{
    key: 'slices',
    value: function slices(chunkSize) {
      if (chunkSize > this.digits.length) {
        throw new Error('Slice size is too big.');
      }
      return this.digits.map(function (digit, index, arr) {
        return arr.slice(index, index + chunkSize);
      }).filter(function (digit) {
        return digit.length === chunkSize;
      });
    }
  }]);

  return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];