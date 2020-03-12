"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectList = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _Base2 = require("./Base");

var ObjectList = function (_Base) {
  (0, _inherits2["default"])(ObjectList, _Base);

  function ObjectList() {
    (0, _classCallCheck2["default"])(this, ObjectList);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ObjectList).apply(this, arguments));
  }

  (0, _createClass2["default"])(ObjectList, [{
    key: "getHOC",
    value: function getHOC() {
      var _this = this;

      var HoC = function HoC(props) {
        return _react["default"].createElement(_this.Component, props);
      };

      HoC.defaultProps = {
        actionCreator: this.options.actionCreator,
        objectList: []
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

        return (0, _defineProperty2["default"])({}, _this2.options.returnPropName, []);
      };
    }
  }]);
  return ObjectList;
}(_Base2.Base);

exports.ObjectList = ObjectList;