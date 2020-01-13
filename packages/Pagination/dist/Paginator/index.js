"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginationReducer = paginationReducer;
exports.usePagination = usePagination;
exports.paginationActionTypes = void 0;

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
        currentPage: action.currentPage
      });

    default:
      return state;
  }
}

function reducerCombiner(reducer) {
  return function (state, action) {
    var changes = paginationReducer(state, action);
    var response = reducer(state, _objectSpread({}, action, {
      changes: changes
    }));
    return response;
  };
}

function usePagination(_ref) {
  var _ref$totalRecords = _ref.totalRecords,
      totalRecords = _ref$totalRecords === void 0 ? 0 : _ref$totalRecords,
      _ref$pageSize = _ref.pageSize,
      pageSize = _ref$pageSize === void 0 ? 1 : _ref$pageSize,
      _ref$reducer = _ref.reducer,
      reducer = _ref$reducer === void 0 ? function (s, a) {
    return a.changes;
  } : _ref$reducer,
      initialState = _ref.initialState;
  var totalPages = Math.ceil(totalRecords / pageSize);
  var PassedInState = initialState ? initialState : {};

  var defaultPaginationState = _objectSpread({
    currentPage: 1,
    pageSize: pageSize,
    totalPages: totalPages,
    totalRecords: totalRecords
  }, PassedInState);

  var combinedReducer = reducerCombiner(reducer);

  var _useReducer = (0, _react.useReducer)(combinedReducer, defaultPaginationState),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      paginationState = _useReducer2[0],
      dispatch = _useReducer2[1];

  var nextPage = function nextPage() {
    return dispatch(changePageCreator(paginationState.currentPage + 1, totalPages));
  };

  var firstPage = function firstPage() {
    return dispatch(changePageCreator(1, totalPages));
  };

  var lastPage = function lastPage() {
    return dispatch(changePageCreator(totalPages, totalPages));
  };

  var previousPage = function previousPage() {
    return dispatch(changePageCreator(paginationState.currentPage - 1, totalPages));
  };

  var goToPage = function goToPage(pageNumber) {
    return dispatch(changePageCreator(pageNumber, totalPages));
  };

  var canPreviousPage = paginationState.currentPage > 1;
  var canNextPage = paginationState.currentPage < totalPages;
  return {
    canNextPage: canNextPage,
    canPreviousPage: canPreviousPage,
    firstPage: firstPage,
    goToPage: goToPage,
    lastPage: lastPage,
    nextPage: nextPage,
    paginationState: paginationState,
    previousPage: previousPage
  };
}

var changePageCreator = function changePageCreator(page, totalPages) {
  var thisPage = (0, _utils.sanitizeNumber)(page, totalPages);
  return {
    currentPage: thisPage,
    type: paginationActionTypes.TO_PAGE
  };
};