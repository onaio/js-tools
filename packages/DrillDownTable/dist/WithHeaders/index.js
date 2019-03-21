"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumns = getColumns;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactTable = _interopRequireDefault(require("react-table"));

var _utils = require("../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getColumns(props) {
  var data = props.data,
      columns = props.columns;

  if (columns) {
    return columns;
  }

  if (data) {
    return (0, _utils.columnsFromObject)(data[0]);
  }

  return [];
}

function WithHeaders(props) {
  var newProps = {
    columns: getColumns(props)
  };
  return _react.default.createElement(_reactTable.default, _extends({}, newProps, props));
}

var _default = WithHeaders;
exports.default = _default;