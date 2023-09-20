"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOauthCallbackProps = exports["default"] = exports.OauthCallback = void 0;
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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var defaultOauthCallbackProps = _objectSpread(_objectSpread({}, _base.defaultBaseCallbackComponentProps), {}, {
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
  var userUri = providerOptions.userUri,
    redirectUri = providerOptions.redirectUri;
  var provider = (0, _oauth.getProviderFromOptions)(providerOptions);
  var urlObject = new URL(locationHash, redirectUri);
  (0, _react.useEffect)(function () {
    if (authSuccess === null || authenticated === false) {
      (0, _services.fetchUser)(urlObject, userUri, provider, authenticateActionCreator, recordResultActionCreator, oAuthUserInfoGetter)["catch"](function (e) {});
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