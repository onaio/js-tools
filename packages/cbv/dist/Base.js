"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reactRedux = require("react-redux");

var Base = function () {
  function Base(component, options) {
    (0, _classCallCheck2["default"])(this, Base);
    (0, _defineProperty2["default"])(this, "Component", void 0);
    (0, _defineProperty2["default"])(this, "options", void 0);
    this.Component = component;
    this.options = options;
  }

  (0, _createClass2["default"])(Base, [{
    key: "getMapDispatchToProps",
    value: function getMapDispatchToProps() {
      return (0, _defineProperty2["default"])({}, this.options.dispatchPropName, this.options.actionCreator);
    }
  }, {
    key: "getConnectedHOC",
    value: function getConnectedHOC() {
      var mapDispatchToProps = this.getMapDispatchToProps();
      var mapStateToProps = this.getMapStateToProps();
      return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(this.getHOC());
    }
  }, {
    key: "render",
    value: function render() {
      return this.getConnectedHOC();
    }
  }]);
  return Base;
}();

exports.Base = Base;