"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RevealPagination = Pagination;
exports.renderPaginationFun = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../helpers/constants");

var defaultPaginationProps = {
  nextText: _constants.NEXT,
  ofText: _constants.OF,
  pageSizeCategories: _constants.PAGE_SIZE_CATEGORIES,
  pageText: _constants.PAGE,
  previousText: _constants.PREVIOUS,
  rowsToDisplayText: _constants.ROWS_TO_DISPLAY
};

function Pagination(props) {
  var gotoPage = props.gotoPage,
      canPreviousPage = props.canPreviousPage,
      canNextPage = props.canNextPage,
      nextPage = props.nextPage,
      previousPage = props.previousPage,
      pageOptions = props.pageOptions,
      setPageSize = props.setPageSize,
      _props$state = props.state,
      pageSize = _props$state.pageSize,
      pageIndex = _props$state.pageIndex,
      pageSizeCategories = props.pageSizeCategories;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      pageNumber = _useState2[0],
      setPageNumber = _useState2[1];

  (0, _react.useEffect)(function () {
    setPageNumber("".concat(pageIndex + 1));
  }, [pageIndex]);

  var onChangePageSize = function onChangePageSize(e) {
    setPageSize(Number(e.target.value));
  };

  var onClickPrevious = function onClickPrevious() {
    previousPage();
  };

  var onChangePageIndex = function onChangePageIndex(e) {
    var newPageNumber = e.target.value;

    if (e.target.value) {
      var value = Number(e.target.value);
      var index = value ? pageOptions.indexOf(value - 1) >= 0 ? value - 1 : 0 : 0;
      gotoPage(index);
      newPageNumber = "".concat(index + 1);
    }

    setPageNumber(newPageNumber);
  };

  var onClickNext = function onClickNext() {
    nextPage();
  };

  return _react["default"].createElement("div", {
    className: "pagination"
  }, _react["default"].createElement("span", {
    className: "mr-2"
  }, props.rowsToDisplayText), _react["default"].createElement("select", {
    className: "page-sizes-select mr-4",
    value: pageSize,
    onChange: onChangePageSize
  }, pageSizeCategories.map(function (pgSize) {
    return _react["default"].createElement("option", {
      key: pgSize,
      value: pgSize
    }, pgSize);
  })), _react["default"].createElement("button", {
    className: "mr-2",
    onClick: onClickPrevious,
    disabled: !canPreviousPage
  }, props.previousText), _react["default"].createElement("span", null, props.pageText, " ", '  ', _react["default"].createElement("input", {
    type: "text",
    value: pageNumber,
    onChange: onChangePageIndex,
    style: {
      width: '40px'
    }
  }), ' ', props.ofText, " ", pageOptions.length), _react["default"].createElement("button", {
    className: "ml-2",
    onClick: onClickNext,
    disabled: !canNextPage
  }, props.nextText), ' ');
}

Pagination.defaultProps = defaultPaginationProps;

var renderPaginationFun = function renderPaginationFun(props) {
  return _react["default"].createElement(Pagination, props);
};

exports.renderPaginationFun = renderPaginationFun;