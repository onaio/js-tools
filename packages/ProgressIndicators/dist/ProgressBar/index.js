"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var defaultProgressBarProps = {
  animate: false,
  cssClass: 'progress-bar-striped progress-bar-animated',
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

var ProgressBar = function ProgressBar(props) {
  var animate = props.animate,
      decimalPoints = props.decimalPoints,
      value = props.value,
      lineColor = props.lineColor,
      stripped = props.stripped,
      lineColorThresholds = props.lineColorThresholds,
      showLabel = props.showLabel,
      cssClass = props.cssClass;
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
    var AscendingThresholds = Object.entries(lineColorThresholds).sort(function (e1, e2) {
      return e1[1] - e2[1];
    });
    AscendingThresholds.forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          key = _ref2[0],
          threshold = _ref2[1];

      if (percentValue >= threshold) {
        backgroundColor = key;
      }
    });
  }

  return _react["default"].createElement("div", {
    className: "progress"
  }, _react["default"].createElement("div", {
    className: "progress-bar ".concat(stripped ? cssClass : '', "\n        ").concat(animate ? cssClass : ''),
    style: {
      backgroundColor: "".concat(backgroundColor),
      width: "".concat(percentValueString, "%")
    },
    role: "progressbar",
    "aria-valuenow": percentValue,
    "aria-valuemin": min,
    "aria-valuemax": max
  }, showLabel ? "".concat(percentValue, "%") : null));
};

ProgressBar.defaultProps = defaultProgressBarProps;
var _default = ProgressBar;
exports["default"] = _default;