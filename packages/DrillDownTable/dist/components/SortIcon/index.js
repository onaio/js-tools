"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortIcon = void 0;

var _react = _interopRequireDefault(require("react"));

require("./sortIcon.css");

var SortIcon = function SortIcon(props) {
  var cssClass = props.isSorted ? props.isSortedDesc ? 'desc' : 'asc' : '';
  return _react["default"].createElement("div", {
    className: "icon-wrapper"
  }, _react["default"].createElement("div", {
    className: "previous-next-filled ".concat(cssClass, " icon")
  }));
};

exports.SortIcon = SortIcon;