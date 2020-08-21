"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.defaultProgressBarProps = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var defaultProgressBarProps = {
  animate: false,
  cssClass: 'progress-bar-striped',
  decimalPoints: 0,
  height: '10px',
  lineColor: '#0000FF',
  lineColorThresholds: undefined,
  max: 100,
  min: 0,
  showLabel: false,
  stripped: false,
  value: 0
};
exports.defaultProgressBarProps = defaultProgressBarProps;

var ProgressBar = function (_Component) {
  (0, _inherits2["default"])(ProgressBar, _Component);

  function ProgressBar(props) {
    (0, _classCallCheck2["default"])(this, ProgressBar);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ProgressBar).call(this, props));
  }

  (0, _createClass2["default"])(ProgressBar, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var animate = props.animate,
          decimalPoints = props.decimalPoints,
          value = props.value,
          lineColor = props.lineColor,
          cssClass = props.cssClass,
          stripped = props.stripped,
          lineColorThresholds = props.lineColorThresholds,
          showLabel = props.showLabel;
      var backgroundColor = lineColor;
      var max = props.max || 100;
      var min = props.min || 0;
      var range = max - min;

      if (range <= 0) {
        range = 100;
      }

      var decimalValue = value / range;
      var percentValue = decimalValue * 100;
      var percentValueString = percentValue.toFixed(decimalPoints);

      if (lineColorThresholds) {
        var ascendingThresholds = Object.keys(lineColorThresholds).sort(function (e1, e2) {
          return lineColorThresholds[e1].value - lineColorThresholds[e2].value;
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = ascendingThresholds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (lineColorThresholds[item].orEquals ? percentValue <= lineColorThresholds[item].value * 100 : percentValue < lineColorThresholds[item].value * 100) {
              backgroundColor = lineColorThresholds[item].color;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return _react["default"].createElement("div", {
        className: "progress"
      }, _react["default"].createElement("div", {
        className: "progress-bar ".concat(stripped ? cssClass : '', "\n          ").concat(animate ? "".concat(cssClass, " progress-bar-animated") : ''),
        style: {
          backgroundColor: "".concat(backgroundColor),
          width: "".concat(percentValueString, "%")
        },
        role: "progressbar",
        "aria-valuenow": percentValue,
        "aria-valuemin": min,
        "aria-valuemax": max
      }, showLabel ? "".concat(percentValue, "%") : null));
    }
  }]);
  return ProgressBar;
}(_react.Component);

(0, _defineProperty2["default"])(ProgressBar, "defaultProps", defaultProgressBarProps);
var _default = ProgressBar;
exports["default"] = _default;