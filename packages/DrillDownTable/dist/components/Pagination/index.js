"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RevealPagination = Pagination;
exports.renderPaginationFun = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../helpers/constants");

require("./pagination.css");

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

  var onChangePageSize = function onChangePageSize(e) {
    setPageSize(Number(e.target.value));
  };

  var onClickPrevious = function onClickPrevious() {
    previousPage();
  };

  var onChangePageIndex = function onChangePageIndex(e) {
    var page = e.target.value ? Number(e.target.value) - 1 : 0;
    gotoPage(page);
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
    value: pageIndex + 1,
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