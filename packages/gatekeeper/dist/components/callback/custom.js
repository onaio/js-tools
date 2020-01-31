"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.APICallback = exports.defaultAPICallbackProps = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _sessionReducer = require("@onaio/session-reducer");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _gatekeeper = require("../../ducks/gatekeeper");

var _services = require("../../helpers/services");

var _utils = require("../../helpers/utils");

var _base = require("./base");

var _utils2 = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultAPICallbackProps = _objectSpread({}, _base.defaultBaseCallbackComponentProps, {
  ErrorComponent: _utils2.RenderErrorComponent,
  HTTP404Component: _utils2.Component404,
  UnSuccessfulLoginComponent: _utils2.RenderErrorComponent,
  authenticateActionCreator: _sessionReducer.authenticateUser,
  recordResultActionCreator: _gatekeeper.recordResult
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
      sessionData = props.sessionData,
      sessionUser = props.sessionUser;
  (0, _react.useEffect)(function () {
    if (authSuccess === null || authenticated === false) {
      (0, _services.fetchState)(apiURL, authenticateActionCreator, recordResultActionCreator, _utils.errorCallback)["catch"](function (e) {});
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

exports.APICallback = APICallback;
APICallback.defaultProps = defaultAPICallbackProps;

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
var ConnectedAPICallback = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(APICallback);
var _default = ConnectedAPICallback;
exports["default"] = _default;