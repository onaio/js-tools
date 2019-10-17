"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paginator = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _base = require("./base");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultPaginatorProps = {
  ariaLabel: 'page navigation',
  endLabel: 'End',
  nextLabel: 'Next',
  onPageChange: function onPageChange(f) {
    return f;
  },
  pageLimit: 30,
  pageNeighbours: 2,
  previousLabel: 'Previous',
  startLabel: 'Start',
  totalRecords: 0
};

var Paginator = function Paginator(props) {
  var _useState = (0, _react.useState)(1),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      currentPage = _useState2[0],
      setCurrentPage = _useState2[1];

  var pageChangeHandler = function pageChangeHandler(paginationData) {
    props.onPageChange(paginationData);
    setCurrentPage(paginationData.currentPage);
  };

  var basePaginatorProps = _objectSpread({}, props, {
    currentPage: currentPage,
    pageChangeHandler: pageChangeHandler
  });

  return _react["default"].createElement(_base.BasePaginator, basePaginatorProps);
};

exports.Paginator = Paginator;
Paginator.defaultProps = defaultPaginatorProps;