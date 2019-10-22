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
  var sanitizedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
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

  var previousLabel = props.previousLabel,
      startLabel = props.startLabel,
      nextLabel = props.nextLabel,
      endLabel = props.endLabel;
  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_reactstrap.Pagination, {
    "aria-label": ariaLabel,
    size: "sm"
  }, _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item ".concat(sanitizedCurrentPage > 1 ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link",
    href: "#",
    "aria-label": startLabel,
    onClick: handleClick(1)
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, startLabel), _react["default"].createElement("span", {
    className: "sr-only"
  }, startLabel))), _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item ".concat(sanitizedCurrentPage > 1 ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link",
    href: "#",
    "aria-label": previousLabel,
    onClick: handleMoveLeft
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, previousLabel), _react["default"].createElement("span", {
    className: "sr-only"
  }, previousLabel))), pages.map(function (page, index) {
    return _react["default"].createElement(_reactstrap.PaginationItem, {
      key: index,
      className: "page-item ".concat(sanitizedCurrentPage === page ? ' active' : '')
    }, _react["default"].createElement(_reactstrap.PaginationLink, {
      className: "page-link",
      href: "#",
      onClick: handleClick(page)
    }, page));
  }), _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item  ".concat(sanitizedCurrentPage < totalPages ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link",
    href: "#",
    "aria-label": nextLabel,
    onClick: handleMoveRight
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, nextLabel), _react["default"].createElement("span", {
    className: "sr-only"
  }, nextLabel))), _react["default"].createElement(_reactstrap.PaginationItem, {
    className: "page-item ".concat(sanitizedCurrentPage < totalPages ? '' : 'disabled')
  }, _react["default"].createElement(_reactstrap.PaginationLink, {
    className: "page-link ".concat(sanitizedCurrentPage < totalPages ? '' : 'disabled'),
    href: "#",
    "aria-label": endLabel,
    onClick: handleClick(totalPages)
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, endLabel), _react["default"].createElement("span", {
    className: "sr-only"
  }, endLabel)))));
};

exports.BasePaginator = BasePaginator;
BasePaginator.defaultProps = defaultBasePaginatorProps;