"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumns = getColumns;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactTable = _interopRequireDefault(require("react-table"));

var _utils = require("../helpers/utils");

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
  return _react.default.createElement(_reactTable.default, (0, _extends2.default)({}, newProps, props));
}

var _default = WithHeaders;
exports.default = _default;