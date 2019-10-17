"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePaginator = exports.defaultBasePaginatorProps = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _utils = require("./utils");

var defaultBasePaginatorProps = {
  ariaLabel: 'page navigation',
  currentPage: 1,
  endLabel: 'End',
  nextLabel: 'Next',
  pageChangeHandler: function pageChangeHandler(f) {
    return f;
  },
  pageLimit: 30,
  pageNeighbours: 2,
  previousLabel: 'Previous',
  startLabel: 'Start',
  totalRecords: 0
};
exports.defaultBasePaginatorProps = defaultBasePaginatorProps;

var BasePaginator = function BasePaginator(props) {
  var totalRecords = props.totalRecords,
      pageLimit = props.pageLimit,
      pageNeighbours = props.pageNeighbours,
      ariaLabel = props.ariaLabel,
      onPageChange = props.pageChangeHandler,
      currentPage = props.currentPage;
  var totalPages = 0;
  var neighbourPillsNum = Math.max(0, Math.min(pageNeighbours, 5));
  totalPages = Math.ceil(totalRecords / pageLimit);
  var pages = (0, _utils.fetchPageNumbers)(neighbourPillsNum, totalPages, currentPage);

  var handleClick = function handleClick(page) {
    return function (e) {
      e.preventDefault();
      gotoPage(page);
    };
  };

  var handleMoveLeft = function handleMoveLeft(e) {
    e.preventDefault();
    gotoPage(currentPage - 1);
  };

  var handleMoveRight = function handleMoveRight(e) {
    e.preventDefault();
    gotoPage(currentPage + 1);
  };

  var gotoPage = function gotoPage(page) {
    var thisPage = Math.max(1, Math.min(page, totalPages));
    var paginationData = {
      currentPage: thisPage,
      pageLimit: pageLimit,
      totalPages: totalPages,
      totalRecords: totalRecords
    };
    onPageChange(paginationData);
  };

  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_reactstrap.Pagination, {
    "aria-label": ariaLabel,
    size: "sm"
  }, _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item ".concat(currentPage > 1 ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link",
    href: "#",
    "aria-label": "Previous",
    onClick: handleClick(1)
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, props.startLabel), _react["default"].createElement("span", {
    className: "sr-only"
  }, props.startLabel))), _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item ".concat(currentPage > 1 ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link",
    href: "#",
    "aria-label": "Previous",
    onClick: handleMoveLeft
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, props.previousLabel), _react["default"].createElement("span", {
    className: "sr-only"
  }, props.previousLabel))), pages.map(function (page, index) {
    return _react["default"].createElement(_reactstrap.PaginationItem, {
      key: index,
      className: "page-item ".concat(currentPage === page ? ' active' : '')
    }, _react["default"].createElement(_reactstrap.PaginationLink, {
      className: "page-link",
      href: "#",
      onClick: handleClick(page)
    }, page));
  }), _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item  ".concat(currentPage < totalPages ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link",
    href: "#",
    "aria-label": "Next",
    onClick: handleMoveRight
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, props.nextLabel), _react["default"].createElement("span", {
    className: "sr-only"
  }, props.nextLabel))), _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item ".concat(currentPage < totalPages ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link ".concat(currentPage < totalPages ? '' : 'disabled'),
    href: "#",
    "aria-label": "Previous",
    onClick: handleClick(totalPages)
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, props.endLabel), _react["default"].createElement("span", {
    className: "sr-only"
  }, props.endLabel)))));
};

exports.BasePaginator = BasePaginator;
BasePaginator.defaultProps = defaultBasePaginatorProps;