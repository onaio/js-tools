"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteTracker = exports.GARoute = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _helpers = require("../../helpers");

var GARoute = function GARoute(props) {
  (0, _react.useEffect)(function () {
    var page = props.location.pathname + props.location.search;
    (0, _helpers.trackPage)(page);
  }, [props.location.pathname, props.location.search]);
  return null;
};

exports.GARoute = GARoute;

var RouteTracker = function RouteTracker() {
  return _react["default"].createElement(_reactRouterDom.Route, {
    component: GARoute
  });
};

exports.RouteTracker = RouteTracker;