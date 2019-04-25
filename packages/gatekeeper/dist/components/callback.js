"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OauthCallback = exports.defaultOauthCallbackProps = exports.SuccessfulLogin = exports.RenderLoadingComponent = exports.RenderErrorComponent = exports.Component404 = void 0;

var _sessionReducer = require("@onaio/session-reducer");

var _queryString = _interopRequireDefault(require("query-string"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _gatekeeper = require("../ducks/gatekeeper");

var _oauth = require("../helpers/oauth");

var _services = require("../helpers/services");

var Component404 = function Component404() {
  return _react.default.createElement("div", {
    className: "gatekeeper-cb"
  }, _react.default.createElement("p", {
    className: "gatekeeper-p"
  }, "Nothing here!"));
};

exports.Component404 = Component404;

var RenderErrorComponent = function RenderErrorComponent() {
  return _react.default.createElement("div", {
    className: "gatekeeper-cb"
  }, _react.default.createElement("p", {
    className: "gatekeeper-p"
  }, "An error occurred!"));
};

exports.RenderErrorComponent = RenderErrorComponent;

var RenderLoadingComponent = function RenderLoadingComponent() {
  return _react.default.createElement("div", {
    className: "gatekeeper-cb"
  }, _react.default.createElement("p", {
    className: "gatekeeper-p"
  }, "Please wait..."));
};

exports.RenderLoadingComponent = RenderLoadingComponent;

var SuccessfulLogin = function SuccessfulLogin(props) {
  var user = props.user;
  return _react.default.createElement("div", {
    className: "gatekeeper-cb"
  }, _react.default.createElement("p", {
    className: "gatekeeper-p"
  }, "Welcome back, ", user.username, "!"));
};

exports.SuccessfulLogin = SuccessfulLogin;
var defaultOauthCallbackProps = {
  ErrorComponent: RenderErrorComponent,
  HTTP404Component: Component404,
  LoadingComponent: RenderLoadingComponent,
  SuccessfulLoginComponent: SuccessfulLogin,
  UnSuccessfulLoginComponent: RenderErrorComponent,
  authSuccess: null,
  authenticateActionCreator: _sessionReducer.authenticateUser,
  authenticated: false,
  oAuthUserInfoGetter: _oauth.getOnadataUserInfo,
  recordResultActionCreator: _gatekeeper.recordResult,
  sessionData: {},
  sessionUser: {
    email: '',
    gravatar: '',
    name: '',
    username: ''
  }
};
exports.defaultOauthCallbackProps = defaultOauthCallbackProps;

var OauthCallback = function OauthCallback(props) {
  var ErrorComponent = props.ErrorComponent,
      HTTP404Component = props.HTTP404Component,
      LoadingComponent = props.LoadingComponent,
      SuccessfulLoginComponent = props.SuccessfulLoginComponent,
      UnSuccessfulLoginComponent = props.UnSuccessfulLoginComponent,
      authSuccess = props.authSuccess,
      authenticateActionCreator = props.authenticateActionCreator,
      authenticated = props.authenticated,
      oAuthUserInfoGetter = props.oAuthUserInfoGetter,
      providers = props.providers,
      recordResultActionCreator = props.recordResultActionCreator,
      sessionData = props.sessionData,
      sessionUser = props.sessionUser;
  var locationHash = props.location.hash;
  var id = props.match.params.id;

  var parsedParams = _queryString.default.parse(location.search);

  var error = parsedParams.error;

  if (error) {
    return _react.default.createElement(ErrorComponent, null);
  }

  if (!Object.keys(providers).includes(id)) {
    return _react.default.createElement(HTTP404Component, null);
  }

  var providerOptions = providers[id];
  var userUri = providerOptions.userUri;
  var provider = (0, _oauth.getProviderFromOptions)(providerOptions);
  (0, _react.useEffect)(function () {
    if (authSuccess === null || authenticated === false) {
      (0, _services.fetchUser)(locationHash, userUri, provider, authenticateActionCreator, recordResultActionCreator, oAuthUserInfoGetter);
    }
  }, []);
  var successProps = {
    extraData: sessionData,
    user: sessionUser
  };
  return authSuccess === null ? _react.default.createElement(LoadingComponent, null) : authenticated === true ? _react.default.createElement(SuccessfulLoginComponent, successProps) : _react.default.createElement(UnSuccessfulLoginComponent, null);
};

exports.OauthCallback = OauthCallback;
OauthCallback.defaultProps = defaultOauthCallbackProps;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var result = {
    authSuccess: (0, _gatekeeper.getSuccess)(state),
    authenticated: (0, _sessionReducer.isAuthenticated)(state),
    sessionData: (0, _sessionReducer.getExtraData)(state),
    sessionUser: (0, _sessionReducer.getUser)(state)
  };
  Object.assign(result, ownProps);
  return result;
};

var mapDispatchToProps = {
  authenticateActionCreator: _sessionReducer.authenticateUser,
  recordResultActionCreator: _gatekeeper.recordResult
};
var ConnectedOauthCallback = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OauthCallback);
var _default = ConnectedOauthCallback;
exports.default = _default;