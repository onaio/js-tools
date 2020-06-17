"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = exports.DropDownCell = exports.NullDataComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../helpers/constants");

var NullDataComponent = function NullDataComponent() {
  return _react["default"].createElement("div", {
    className: "jumbotron"
  }, _react["default"].createElement("p", null, _constants.NO_DATA_FOUND));
};

exports.NullDataComponent = NullDataComponent;

var DropDownCell = function DropDownCell(props) {
  var cellValue = props.cellValue,
      hasChildren = props.hasChildren;
  return _react["default"].createElement("div", {
    className: hasChildren ? _constants.CLICKABLE_CSS_CLASS : _constants.LINKER_ITEM_CSS_CLASS
  }, _react["default"].createElement("span", null, cellValue, hasChildren && _constants.CARET_SPAN));
};

exports.DropDownCell = DropDownCell;
var defaultSPinnerProps = {
  loadingText: _constants.LOADING
};

var Spinner = function Spinner(props) {
  return _react["default"].createElement("div", {
    className: "spinner-border m-5",
    role: "status"
  }, _react["default"].createElement("span", {
    className: "sr-only"
  }, _constants.LOADING, "..."));
};

exports.Spinner = Spinner;
Spinner.defaultProps = defaultSPinnerProps;