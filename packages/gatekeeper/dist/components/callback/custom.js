"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultAPICallbackProps = exports["default"] = exports.APICallback = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _sessionReducer = require("@onaio/session-reducer");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _gatekeeper = require("../../ducks/gatekeeper");
var _services = require("../../helpers/services");
var _utils = require("../../helpers/utils");
var _base = require("./base");
var _utils2 = require("./utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var defaultAPICallbackProps = _objectSpread(_objectSpread({}, _base.defaultBaseCallbackComponentProps), {}, {
  ErrorComponent: _utils2.RenderErrorComponent,
  HTTP404Component: _utils2.Component404,
  UnSuccessfulLoginComponent: _utils2.RenderErrorComponent,
  authenticateActionCreator: _sessionReducer.authenticateUser,
  authenticationProgressCreator: _gatekeeper.authenticationProgress,
  logoutActionCreator: _sessionReducer.logOutUser,
  recordResultActionCreator: _gatekeeper.recordResult,
  working: false
});
exports.defaultAPICallbackProps = defaultAPICallbackProps;
var APICallback = function APICallback(props) {
  var LoadingComponent = props.LoadingComponent,
    SuccessfulLoginComponent = props.SuccessfulLoginComponent,
    UnSuccessfulLoginComponent = props.UnSuccessfulLoginComponent,
    apiURL = props.apiURL,
    authSuccess = props.authSuccess,
    authenticated = props.authenticated,
    authenticateActionCreator = props.authenticateActionCreator,
    recordResultActionCreator = props.recordResultActionCreator,
    authenticationProgressCreator = props.authenticationProgressCreator,
    logoutActionCreator = props.logoutActionCreator,
    sessionData = props.sessionData,
    sessionUser = props.sessionUser,
    working = props.working;
  (0, _react.useEffect)(function () {
    if (authSuccess === null || authenticated === false) {
      (0, _services.fetchState)(apiURL, {
        authenticateActionCreator: authenticateActionCreator,
        authenticationProgressCreator: authenticationProgressCreator,
        errorCallbackFn: _utils.errorCallback,
        logoutActionCreator: logoutActionCreator,
        recordResultActionCreator: recordResultActionCreator
      })["catch"](function (e) {});
    }
  }, []);
  var baseProps = {
    LoadingComponent: LoadingComponent,
    SuccessfulLoginComponent: SuccessfulLoginComponent,
    UnSuccessfulLoginComponent: UnSuccessfulLoginComponent,
    authSuccess: authSuccess,
    authenticated: authenticated,
    sessionData: sessionData,
    sessionUser: sessionUser,
    working: working
  };
  return _react["default"].createElement(_base.BaseCallbackComponent, baseProps);
};
exports.APICallback = APICallback;
APICallback.defaultProps = defaultAPICallbackProps;
var mapStateToProps = function mapStateToProps(state, ownProps) {
  var result = {
    authSuccess: (0, _gatekeeper.getSuccess)(state),
    authenticated: (0, _sessionReducer.isAuthenticated)(state),
    sessionData: (0, _sessionReducer.getExtraData)(state),
    sessionUser: (0, _sessionReducer.getUser)(state),
    working: (0, _gatekeeper.isAuthenticating)(state)
  };
  Object.assign(result, ownProps);
  return result;
};
var mapDispatchToProps = {
  authenticateActionCreator: _sessionReducer.authenticateUser,
  authenticationProgressCreator: _gatekeeper.authenticationProgress,
  logoutActionCreator: _sessionReducer.logOutUser,
  recordResultActionCreator: _gatekeeper.recordResult
};
var ConnectedAPICallback = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(APICallback);
var _default = ConnectedAPICallback;
exports["default"] = _default;