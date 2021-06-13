"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.power = power;
exports.Foo = exports.pi = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pi = Math.PI;
exports.pi = pi;

function power(x, y) {
  // 제곱
  return Math.pow(x, y);
}

var Foo = /*#__PURE__*/function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: "foo",
    value: function foo() {
      console.log("Foo!");
    }
  }]);

  return Foo;
}();

exports.Foo = Foo;