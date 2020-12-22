"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenExpired = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("reactstrap");

var _constants = require("./constants");

var _reactRouterDom = require("react-router-dom");

var TokenExpired = function TokenExpired(props) {
  var logoutLinkText = props.logoutLinkText,
      logoutUrl = props.logoutUrl,
      sessionExpiryText = props.sessionExpiryText;
  return _react["default"].createElement(_reactstrap.Container, {
    fluid: true,
    style: {
      minHeight: '100vh',
      position: 'relative'
    }
  }, _react["default"].createElement(_reactstrap.Row, {
    style: {
      marginTop: '40px'
    },
    className: "text-center"
  }, _react["default"].createElement(_reactstrap.Col, {
    sm: "12",
    md: {
      size: 8,
      offset: 2
    }
  }, _react["default"].createElement("h2", null, sessionExpiryText), _react["default"].createElement(_reactRouterDom.Link, {
    to: logoutUrl
  }, logoutLinkText))));
};

exports.TokenExpired = TokenExpired;
var defaultTokenExpiryProps = {
  logoutLinkText: _constants.LOGIN_BUTTON_TEXT,
  sessionExpiryText: _constants.SESSION_EXPIRED_TEXT
};
TokenExpired.defaultProps = defaultTokenExpiryProps;