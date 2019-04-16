"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ReducerRegistry = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var ReducerRegistry = function () {
  function ReducerRegistry() {
    (0, _classCallCheck2.default)(this, ReducerRegistry);
    (0, _defineProperty2.default)(this, "emitChange", void 0);
    (0, _defineProperty2.default)(this, "reducers", void 0);
    this.emitChange = null;
    this.reducers = {};
  }

  (0, _createClass2.default)(ReducerRegistry, [{
    key: "getReducers",
    value: function getReducers() {
      return (0, _objectSpread3.default)({}, this.reducers);
    }
  }, {
    key: "register",
    value: function register(name, reducer) {
      this.reducers = (0, _objectSpread3.default)({}, this.reducers, (0, _defineProperty2.default)({}, name, reducer));

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