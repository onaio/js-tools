"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleObject = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _Base2 = require("./Base");

var SingleObject = function (_Base) {
  (0, _inherits2["default"])(SingleObject, _Base);

  function SingleObject() {
    (0, _classCallCheck2["default"])(this, SingleObject);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SingleObject).apply(this, arguments));
  }

  (0, _createClass2["default"])(SingleObject, [{
    key: "getHOC",
    value: function getHOC() {
      var _this = this;

      var HoC = function HoC(props) {
        return _react["default"].createElement(_this.Component, props);
      };

      HoC.defaultProps = {
        actionCreator: this.options.actionCreator
      };
      return HoC;
    }
  }, {
    key: "getMapStateToProps",
    value: function getMapStateToProps() {
      var _this2 = this;

      return function (state, ownProps) {
        if (typeof _this2.options.selector === 'function') {
          return (0, _defineProperty2["default"])({}, _this2.options.returnPropName, _this2.options.selector(state, ownProps));
        }

        return (0, _defineProperty2["default"])({}, _this2.options.returnPropName, null);
      };
    }
  }]);
  return SingleObject;
}(_Base2.Base);

exports.SingleObject = SingleObject;