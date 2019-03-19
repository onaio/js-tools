"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ReducerRegistry = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReducerRegistry = function () {
  function ReducerRegistry() {
    _classCallCheck(this, ReducerRegistry);

    _defineProperty(this, "emitChange", void 0);

    _defineProperty(this, "reducers", void 0);

    this.emitChange = null;
    this.reducers = {};
  }

  _createClass(ReducerRegistry, [{
    key: "getReducers",
    value: function getReducers() {
      return _objectSpread({}, this.reducers);
    }
  }, {
    key: "register",
    value: function register(name, reducer) {
      this.reducers = _objectSpread({}, this.reducers, _defineProperty({}, name, reducer));

      if (this.emitChange !== null) {
        this.emitChange(this.getReducers());
      }
    }
  }, {
    key: "setChangeListener",
    value: function setChangeListener(listener) {
      this.emitChange = listener;
    }
  }]);

  return ReducerRegistry;
}();

exports.ReducerRegistry = ReducerRegistry;
var reducerRegistry = new ReducerRegistry();
var _default = reducerRegistry;
exports.default = _default;