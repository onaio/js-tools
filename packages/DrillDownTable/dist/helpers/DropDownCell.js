"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

var DropDownCell = function DropDownCell(props) {
  var cellValue = props.cellValue,
      hasChildren = props.hasChildren;
  return _react["default"].createElement("div", {
    className: hasChildren ? _constants.CLICKABLE_CSS_CLASS : _constants.LINKER_ITEM_CSS_CLASS
  }, _react["default"].createElement("span", null, cellValue, hasChildren && _constants.CARET));
};

var _default = DropDownCell;
exports["default"] = _default;