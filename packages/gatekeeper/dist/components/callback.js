"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OauthCallback = exports.SuccessfulLogin = exports.RenderErrorComponent = exports.Component404 = void 0;

var _sessionReducer = require("@onaio/session-reducer");

var _queryString = _interopRequireDefault(require("query-string"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

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

var SuccessfulLogin = function SuccessfulLogin(props) {
  var user = props.user;
  return _react.default.createElement("div", {
    className: "gatekeeper-cb"
  }, _react.default.createElement("p", {
    className: "gatekeeper-p"
  }, "Welcome back, ", user.username, "!"));
};

exports.SuccessfulLogin = SuccessfulLogin;

var OauthCallback = function OauthCallback(props) {
  var _props$ErrorComponent = props.ErrorComponent,
      ErrorComponent = _props$ErrorComponent === void 0 ? RenderErrorComponent : _props$ErrorComponent,
      _props$HTTP404Compone = props.HTTP404Component,
      HTTP404Component = _props$HTTP404Compone === void 0 ? Component404 : _props$HTTP404Compone,
      _props$SuccessfulLogi = props.SuccessfulLoginComponent,
      SuccessfulLoginComponent = _props$SuccessfulLogi === void 0 ? SuccessfulLogin : _props$SuccessfulLogi,
      _props$UnSuccessfulLo = props.UnSuccessfulLoginComponent,
      UnSuccessfulLoginComponent = _props$UnSuccessfulLo === void 0 ? RenderErrorComponent : _props$UnSuccessfulLo,
      authenticateActionCreator = props.authenticateActionCreator,
      authenticated = props.authenticated,
      providers = props.providers,
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
    if (authenticated === false) {
      (0, _services.fetchUser)(locationHash, userUri, provider, authenticateActionCreator);
    }
  }, []);
  var successProps = {
    extraData: sessionData,
    user: sessionUser
  };

  if (authenticated === true && SuccessfulLoginComponent) {
    return _react.default.createElement(SuccessfulLoginComponent, successProps);
  }

  return _react.default.createElement(UnSuccessfulLoginComponent, null);
};

exports.OauthCallback = OauthCallback;
var defaultProps = {
  ErrorComponent: RenderErrorComponent,
  HTTP404Component: Component404,
  SuccessfulLoginComponent: SuccessfulLogin,
  UnSuccessfulLoginComponent: RenderErrorComponent
};
OauthCallback.defaultProps = defaultProps;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var result = {
    authenticated: (0, _sessionReducer.isAuthenticated)(state),
    sessionData: (0, _sessionReducer.getExtraData)(state),
    sessionUser: (0, _sessionReducer.getUser)(state)
  };
  Object.assign(result, ownProps);
  return result;
};

var mapDispatchToProps = {
  authenticateActionCreator: _sessionReducer.authenticateUser
};
var ConnectedOauthCallback = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OauthCallback);
var _default = ConnectedOauthCallback;
exports.default = _default;