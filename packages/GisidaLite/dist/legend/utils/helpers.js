"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.legendBlockBuilder = void 0;

var _react = _interopRequireDefault(require("react"));

var legendBlockBuilder = function legendBlockBuilder(color, width, label) {
  return _react["default"].createElement("li", {
    key: color,
    style: {
      background: color,
      width: "".concat(width, "%")
    }
  }, label);
};

exports.legendBlockBuilder = legendBlockBuilder;