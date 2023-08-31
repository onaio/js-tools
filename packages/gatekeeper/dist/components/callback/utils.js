"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessfulLogin = exports.RenderLoadingComponent = exports.RenderErrorComponent = exports.Component404 = void 0;
var _react = _interopRequireDefault(require("react"));
var _constants = require("../../helpers/constants");
var Component404 = function Component404(_ref) {
  var _ref$message = _ref.message,
    message = _ref$message === void 0 ? _constants.NOTHING_HERE : _ref$message;
  return _react["default"].createElement("div", {
    className: "gatekeeper-cb"
  }, _react["default"].createElement("p", {
    className: "gatekeeper-p"
  }, message));
};
exports.Component404 = Component404;
var RenderErrorComponent = function RenderErrorComponent(_ref2) {
  var _ref2$message = _ref2.message,
    message = _ref2$message === void 0 ? _constants.AN_ERROR_OCCURRED : _ref2$message;
  return _react["default"].createElement("div", {
    className: "gatekeeper-cb"
  }, _react["default"].createElement("p", {
    className: "gatekeeper-p"
  }, message));
};
exports.RenderErrorComponent = RenderErrorComponent;
var RenderLoadingComponent = function RenderLoadingComponent(_ref3) {
  var _ref3$message = _ref3.message,
    message = _ref3$message === void 0 ? _constants.PLEASE_WAIT : _ref3$message;
  return _react["default"].createElement("div", {
    className: "gatekeeper-cb"
  }, _react["default"].createElement("p", {
    className: "gatekeeper-p"
  }, message));
};
exports.RenderLoadingComponent = RenderLoadingComponent;
var SuccessfulLogin = function SuccessfulLogin(props) {
  var user = props.user;
  return _react["default"].createElement("div", {
    className: "gatekeeper-cb"
  }, _react["default"].createElement("p", {
    className: "gatekeeper-p"
  }, "".concat(_constants.WELCOME_BACK, " ").concat(user.username, "!")));
};
exports.SuccessfulLogin = SuccessfulLogin;