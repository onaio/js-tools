"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginationReducer = paginationReducer;
exports.usePagination = exports.paginationActionTypes = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var paginationActionTypes;
exports.paginationActionTypes = paginationActionTypes;

(function (paginationActionTypes) {
  paginationActionTypes["TO_PAGE"] = "TO_PAGE";
})(paginationActionTypes || (exports.paginationActionTypes = paginationActionTypes = {}));

function paginationReducer(state, action) {
  switch (action.type) {
    case paginationActionTypes.TO_PAGE:
      return _objectSpread({}, state, {
        currentPage: action.currentPage,
        pagesToBeDisplayed: action.pagesToBeDisplayed
      });

    default:
      return state;
  }
}

var usePagination = function usePagination(options) {
  var totalRecords = options.totalRecords,
      pageSize = options.pageSize,
      pageNeighbors = options.pageNeighbors;
  var totalPages = Math.ceil(totalRecords / pageSize);
  var neighborPillsNum = Math.max(2, Math.min(pageNeighbors, 5));
  var defaultPaginationState = {
    currentPage: 1,
    pageSize: pageSize,
    pagesToBeDisplayed: (0, _utils.fetchPageNumbers)(neighborPillsNum, totalPages, 0),
    totalPages: totalPages,
    totalRecords: totalRecords
  };

  var _useReducer = (0, _react.useReducer)(paginationReducer, defaultPaginationState),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var nextPage = function nextPage() {
    return dispatch(changePageCreator(state.currentPage + 1, totalPages, pageNeighbors));
  };

  var firstPage = function firstPage() {
    return dispatch(changePageCreator(1, totalPages, pageNeighbors));
  };

  var lastPage = function lastPage() {
    return dispatch(changePageCreator(totalPages, totalPages, pageNeighbors));
  };

  var previousPage = function previousPage() {
    return dispatch(changePageCreator(state.currentPage - 1, totalPages, pageNeighbors));
  };

  var goToPage = function goToPage(pageNumber) {
    return dispatch(changePageCreator(pageNumber, totalPages, pageNeighbors));
  };

  var canPreviousPage = state.currentPage > 1;
  var canNextPage = state.currentPage < totalPages;
  return {
    canNextPage: canNextPage,
    canPreviousPage: canPreviousPage,
    firstPage: firstPage,
    goToPage: goToPage,
    lastPage: lastPage,
    nextPage: nextPage,
    paginationState: state,
    previousPage: previousPage
  };
};

exports.usePagination = usePagination;

var changePageCreator = function changePageCreator(page, totalPages, pageNeighbors) {
  var thisPage = (0, _utils.sanitizeNumber)(page, totalPages);
  return {
    currentPage: thisPage,
    pagesToBeDisplayed: (0, _utils.fetchPageNumbers)(pageNeighbors, totalPages, thisPage),
    type: paginationActionTypes.TO_PAGE
  };
};