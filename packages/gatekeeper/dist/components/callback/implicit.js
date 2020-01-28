"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OauthCallback = exports.defaultOauthCallbackProps = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _sessionReducer = require("@onaio/session-reducer");

var _queryString = _interopRequireDefault(require("query-string"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _gatekeeper = require("../../ducks/gatekeeper");

var _oauth = require("../../helpers/oauth");

var _services = require("../../helpers/services");

var _base = require("./base");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultOauthCallbackProps = _objectSpread({}, _base.defaultBaseCallbackComponentProps, {
  ErrorComponent: _utils.RenderErrorComponent,
  HTTP404Component: _utils.Component404,
  UnSuccessfulLoginComponent: _utils.RenderErrorComponent,
  authenticateActionCreator: _sessionReducer.authenticateUser,
  oAuthUserInfoGetter: _oauth.getOnadataUserInfo,
  recordResultActionCreator: _gatekeeper.recordResult
});

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

  var parsedParams = _queryString["default"].parse(location.search);

  var error = parsedParams.error;

  if (error) {
    return _react["default"].createElement(ErrorComponent, null);
  }

  if (!Object.keys(providers).includes(id)) {
    return _react["default"].createElement(HTTP404Component, null);
  }

  var providerOptions = providers[id];
  var userUri = providerOptions.userUri;
  var provider = (0, _oauth.getProviderFromOptions)(providerOptions);
  (0, _react.useEffect)(function () {
    if (authSuccess === null || authenticated === false) {
      (0, _services.fetchUser)(locationHash, userUri, provider, authenticateActionCreator, recordResultActionCreator, oAuthUserInfoGetter)["catch"](function (e) {});
    }
  }, []);
  var baseProps = {
    LoadingComponent: LoadingComponent,
    SuccessfulLoginComponent: SuccessfulLoginComponent,
    UnSuccessfulLoginComponent: UnSuccessfulLoginComponent,
    authSuccess: authSuccess,
    authenticated: authenticated,
    sessionData: sessionData,
    sessionUser: sessionUser
  };
  return _react["default"].createElement(_base.BaseCallbackComponent, baseProps);
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
exports["default"] = _default;