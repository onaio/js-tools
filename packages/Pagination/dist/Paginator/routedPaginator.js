"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoutedPaginator = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _base = require("./base");

var defaultRoutedPaginatorProps = {
  ariaLabel: 'page navigation',
  endLabel: 'End',
  nextLabel: 'Next',
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

  (0, _react.useEffect)(function () {
    currentPageFromRoute();
  }, []);

  var currentPageFromRoute = function currentPageFromRoute() {
    var match = props.match;
    var pageFromUrl = match.params.tablePage;
    var redirectToPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
    setCurrentPage(redirectToPage);
  };

  var getRedirectUrl = function getRedirectUrl(thisPage, path, params) {
    var urlToRedirectTo = '';
    Object.entries(params).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      var val = v;

      if (k === 'tablePage') {
        val = thisPage;
      }

      urlToRedirectTo = path.replace("/:".concat(k), "/".concat(val));
    });
    return urlToRedirectTo;
  };

  var pageChangeHandler = function pageChangeHandler(paginationData) {
    var _props$match = props.match,
        path = _props$match.path,
        params = _props$match.params;
    var urlToRedirectTo = getRedirectUrl(paginationData.currentPage, path, params);
    props.history.push(urlToRedirectTo);
  };

  var ariaLabel = props.ariaLabel,
      endLabel = props.endLabel,
      nextLabel = props.nextLabel,
      pageLimit = props.pageLimit,
      pageNeighbours = props.pageNeighbours,
      previousLabel = props.previousLabel,
      startLabel = props.startLabel,
      totalRecords = props.totalRecords;
  var basePaginatorProps = {
    ariaLabel: ariaLabel,
    currentPage: currentPage,
    endLabel: endLabel,
    nextLabel: nextLabel,
    pageChangeHandler: pageChangeHandler,
    pageLimit: pageLimit,
    pageNeighbours: pageNeighbours,
    previousLabel: previousLabel,
    startLabel: startLabel,
    totalRecords: totalRecords
  };
  return _react["default"].createElement(_base.BasePaginator, basePaginatorProps);
};

Paginator.defaultProps = defaultRoutedPaginatorProps;
var RoutedPaginator = (0, _reactRouter.withRouter)(Paginator);
exports.RoutedPaginator = RoutedPaginator;