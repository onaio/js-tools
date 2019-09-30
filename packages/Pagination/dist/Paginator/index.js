"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paginator = exports.fetchPageNumbers = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var defaultPaginatorProps = {
  ariaLabel: 'page navigation',
  onPageChange: function onPageChange(f) {
    return f;
  },
  pageLimit: 30,
  pageNeighbours: 2,
  totalRecords: 0
};

var Paginator = function Paginator(props) {
  var totalRecords = props.totalRecords,
      pageLimit = props.pageLimit,
      pageNeighbours = props.pageNeighbours,
      ariaLabel = props.ariaLabel,
      onPageChange = props.onPageChange;
  var totalPages = 0;

  var _useState = (0, _react.useState)(1),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      currentPage = _useState2[0],
      setCurrentPage = _useState2[1];

  var neighbourPillsNum = Math.max(0, Math.min(pageNeighbours, 5));
  totalPages = Math.ceil(totalRecords / pageLimit);
  var pages = fetchPageNumbers(neighbourPillsNum, totalPages, currentPage);

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
    setCurrentPage(thisPage);
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
  }, "start"), _react["default"].createElement("span", {
    className: "sr-only"
  }, "Start"))), _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item ".concat(currentPage > 1 ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link",
    href: "#",
    "aria-label": "Previous",
    onClick: handleMoveLeft
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, "previous"), _react["default"].createElement("span", {
    className: "sr-only"
  }, "Previous"))), pages.map(function (page, index) {
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
  }, "next"), _react["default"].createElement("span", {
    className: "sr-only"
  }, "Next"))), _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item ".concat(currentPage < totalPages ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link ".concat(currentPage < totalPages ? '' : 'disabled'),
    href: "#",
    "aria-label": "Previous",
    onClick: handleClick(totalPages)
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, "end"), _react["default"].createElement("span", {
    className: "sr-only"
  }, "End")))));
};

exports.Paginator = Paginator;

var fetchPageNumbers = function fetchPageNumbers(neighbourPillsNum, totalPages, currentPage) {
  var startPage = Math.max(1, currentPage - neighbourPillsNum);
  var endPage = Math.min(totalPages + 1, currentPage + neighbourPillsNum + 1);
  var numberedPages = (0, _lodash.range)(startPage, endPage);
  return numberedPages;
};

exports.fetchPageNumbers = fetchPageNumbers;
Paginator.defaultProps = defaultPaginatorProps;