"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Legend = exports.defaultLegendProps = void 0;

var _react = _interopRequireDefault(require("react"));

require("./legend.css");

var _helpers = require("./utils/helpers");

var defaultLegendProps = {
  legendData: [{
    color: '#bdd7e7',
    fillWidth: '33px',
    label: '0'
  }, {
    color: '#4292c6',
    fillWidth: '33px',
    label: '1-2'
  }, {
    color: '#2171b5',
    fillWidth: '33px',
    label: '3-6'
  }, {
    color: '#08519c',
    fillWidth: '33px',
    label: '6-11'
  }, {
    color: '#08306b',
    fillWidth: '33px',
    label: '12-16'
  }]
};
exports.defaultLegendProps = defaultLegendProps;

var Legend = function Legend(props) {
  var legendData = props.legendData,
      legendCreditText = props.legendCreditText;
  var background = [];
  legendData.forEach(function (legendBlock, index) {
    background.push((0, _helpers.legendBlockBuilder)(legendBlock.color, legendBlock.fillWidth, legendBlock.label));
  });
  return _react["default"].createElement("div", {
    className: "legend"
  }, _react["default"].createElement("div", {
    className: "legend-fill legend-label"
  }, _react["default"].createElement("ul", {
    id: "legend-background"
  }, background)), legendCreditText && _react["default"].createElement("span", null, legendCreditText));
};

exports.Legend = Legend;
Legend.defaultProps = defaultLegendProps;