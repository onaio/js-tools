"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ReducerRegistry = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ReducerRegistry = function () {
  function ReducerRegistry() {
    (0, _classCallCheck2["default"])(this, ReducerRegistry);
    (0, _defineProperty2["default"])(this, "emitChange", void 0);
    (0, _defineProperty2["default"])(this, "reducers", void 0);
    this.emitChange = null;
    this.reducers = {};
  }

  (0, _createClass2["default"])(ReducerRegistry, [{
    key: "getReducers",
    value: function getReducers() {
      return _objectSpread({}, this.reducers);
    }
  }, {
    key: "register",
    value: function register(name, reducer) {
      this.reducers = _objectSpread({}, this.reducers, (0, _defineProperty2["default"])({}, name, reducer));

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
exports["default"] = _default;