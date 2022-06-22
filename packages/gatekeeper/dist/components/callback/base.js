"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultBaseCallbackComponentProps = exports.BaseCallbackComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var defaultBaseCallbackComponentProps = {
  LoadingComponent: _utils.RenderLoadingComponent,
  SuccessfulLoginComponent: _utils.SuccessfulLogin,
  UnSuccessfulLoginComponent: _utils.RenderErrorComponent,
  authSuccess: null,
  authenticated: false,
  sessionData: {},
  sessionUser: {
    email: '',
    gravatar: '',
    name: '',
    username: ''
  },
  working: false
};
exports.defaultBaseCallbackComponentProps = defaultBaseCallbackComponentProps;

var BaseCallbackComponent = function BaseCallbackComponent(props) {
  var LoadingComponent = props.LoadingComponent,
      SuccessfulLoginComponent = props.SuccessfulLoginComponent,
      UnSuccessfulLoginComponent = props.UnSuccessfulLoginComponent,
      authSuccess = props.authSuccess,
      authenticated = props.authenticated,
      sessionData = props.sessionData,
      sessionUser = props.sessionUser,
      working = props.working;
  var successProps = {
    extraData: sessionData,
    user: sessionUser
  };
  return authSuccess === null || working === true ? _react["default"].createElement(LoadingComponent, null) : authenticated === true ? _react["default"].createElement(SuccessfulLoginComponent, successProps) : _react["default"].createElement(UnSuccessfulLoginComponent, null);
};

exports.BaseCallbackComponent = BaseCallbackComponent;
BaseCallbackComponent.defaultProps = defaultBaseCallbackComponentProps;