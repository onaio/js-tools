"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PrivateRoute = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _sessionReducer = require("@onaio/session-reducer");

var _querystring = _interopRequireDefault(require("querystring"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var defaultPrivateRouteProps = {
  authenticated: false,
  disableLoginProtection: false,
  redirectPath: '/login'
};

var PrivateRoute = function PrivateRoute(props) {
  var Component = props.component,
      authenticated = props.authenticated,
      disableLoginProtection = props.disableLoginProtection,
      redirectPath = props.redirectPath,
      location = props.location,
      theOtherProps = (0, _objectWithoutProperties2["default"])(props, ["component", "authenticated", "disableLoginProtection", "redirectPath", "location"]);
  var currentPath = "".concat(location && location.pathname || '').concat(location && location.search || '').concat(location && location.hash || '');
  var fullRedirectPath = redirectPath;

  if (typeof currentPath !== 'undefined' && currentPath.length > 0) {
    fullRedirectPath = "".concat(redirectPath, "?").concat(_querystring["default"].stringify({
      next: currentPath
    }));
  }

  return _react["default"].createElement(_reactRouterDom.Route, (0, _extends2["default"])({}, theOtherProps, {
    render: function render(routeProps) {
      return (authenticated === true || disableLoginProtection === true) && Component ? _react["default"].createElement(Component, (0, _extends2["default"])({}, routeProps, theOtherProps)) : _react["default"].createElement(_reactRouterDom.Redirect, {
        to: fullRedirectPath
      });
    }
  }));
};

exports.PrivateRoute = PrivateRoute;
PrivateRoute.defaultProps = defaultPrivateRouteProps;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var result = {
    authenticated: (0, _sessionReducer.isAuthenticated)(state)
  };
  Object.assign(result, ownProps);
  return result;
};

var ConnectedPrivateRoute = (0, _reactRedux.connect)(mapStateToProps, null)(PrivateRoute);
var _default = ConnectedPrivateRoute;
exports["default"] = _default;