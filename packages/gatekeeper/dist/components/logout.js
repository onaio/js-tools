"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultLogoutProps = exports.defaultLogout = exports["default"] = exports.Logout = void 0;

var _sessionReducer = require("@onaio/session-reducer");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _constants = require("../helpers/constants");

var defaultLogout = function defaultLogout(logoutActionCreator, redirectPath) {
  logoutActionCreator();
  return _react["default"].createElement(_reactRouterDom.Redirect, {
    to: redirectPath
  });
};

exports.defaultLogout = defaultLogout;
var defaultLogoutProps = {
  logoutActionCreator: _sessionReducer.logOutUser,
  logoutFunction: defaultLogout,
  redirectPath: _constants.LOGIN_URL
};
exports.defaultLogoutProps = defaultLogoutProps;

var Logout = function Logout(props) {
  var logoutActionCreator = props.logoutActionCreator,
      redirectPath = props.redirectPath;
  var logoutFunction = props.logoutFunction;
  return logoutFunction(logoutActionCreator, redirectPath);
};

exports.Logout = Logout;
Logout.defaultProps = defaultLogoutProps;
var mapDispatchToProps = {
  logoutActionCreator: _sessionReducer.logOutUser
};
var ConnectedLogout = (0, _reactRedux.connect)(null, mapDispatchToProps)(Logout);
var _default = ConnectedLogout;
exports["default"] = _default;