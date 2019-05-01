"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var defaultElementMapProps = {
  className: 'element-map'
};

var ElementMap = function (_React$Component) {
  (0, _inherits2.default)(ElementMap, _React$Component);

  function ElementMap(props) {
    (0, _classCallCheck2.default)(this, ElementMap);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ElementMap).call(this, props));
  }

  (0, _createClass2.default)(ElementMap, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          HTMLTag = _this$props.HTMLTag,
          className = _this$props.className,
          items = _this$props.items;
      var listItems = items.map(function (item, key) {
        return _react.default.createElement(HTMLTag, {
          key: key,
          className: className
        }, item);
      });
      return listItems;
    }
  }]);
  return ElementMap;
}(_react.default.Component);

(0, _defineProperty2.default)(ElementMap, "defaultProps", defaultElementMapProps);
var _default = ElementMap;
exports.default = _default;