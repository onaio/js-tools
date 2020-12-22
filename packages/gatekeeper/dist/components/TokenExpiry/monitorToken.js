"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MonitorTokenExpiry = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _sessionReducer = require("@onaio/session-reducer");

var _reactRouter = require("react-router");

var MonitorTokenExpiry = function MonitorTokenExpiry(props) {
  var tokenExpired = props.tokenExpired,
      redirectUrl = props.redirectUrl;

  if (tokenExpired) {
    return _react["default"].createElement(_reactRouter.Redirect, {
      to: redirectUrl
    });
  }

  return null;
};

exports.MonitorTokenExpiry = MonitorTokenExpiry;
var defaultMonitorTokenExpiryProps = {
  tokenExpired: false
};
MonitorTokenExpiry.defaultProps = defaultMonitorTokenExpiryProps;

var mapStateToProps = function mapStateToProps(state) {
  var tokenExpired = (0, _sessionReducer.isTokenExpired)(state);
  return {
    tokenExpired: tokenExpired
  };
};

var ConnectedMonitorTokenExpiry = (0, _reactRedux.connect)(mapStateToProps, null)(MonitorTokenExpiry);
var _default = ConnectedMonitorTokenExpiry;
exports["default"] = _default;