"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PrivateRoute = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _sessionReducer = require("@onaio/session-reducer");

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
      theOtherProps = (0, _objectWithoutProperties2.default)(props, ["component", "authenticated", "disableLoginProtection", "redirectPath"]);
  return _react.default.createElement(_reactRouterDom.Route, (0, _extends2.default)({}, theOtherProps, {
    render: function render(routeProps) {
      return (authenticated === true || disableLoginProtection === true) && Component ? _react.default.createElement(Component, (0, _extends2.default)({}, routeProps, theOtherProps)) : _react.default.createElement(_reactRouterDom.Redirect, {
        to: redirectPath
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
exports.default = _default;