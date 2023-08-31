"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationProgress = exports.RECORD = exports.AUTHENTICATION_PROGRESS = void 0;
exports["default"] = reducer;
exports.getResult = getResult;
exports.getSuccess = getSuccess;
exports.initialState = void 0;
exports.isAuthenticating = isAuthenticating;
exports.reducerName = exports.recordResult = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var reducerName = 'gatekeeper';
exports.reducerName = reducerName;
var initialState = (0, _seamlessImmutable["default"])({
  result: {},
  success: null,
  working: false
});
exports.initialState = initialState;
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case RECORD:
      return state.merge({
        result: _objectSpread({}, action.result),
        success: action.success
      });
    case AUTHENTICATION_PROGRESS:
      return state.merge({
        working: action.working
      });
    default:
      return state;
  }
}
var RECORD = '@onaio/gatekeeper/reducer/RECORD';
exports.RECORD = RECORD;
var AUTHENTICATION_PROGRESS = '@onaio/gatekeeper/reducer/AUTHENTICATION_PROGRESS';
exports.AUTHENTICATION_PROGRESS = AUTHENTICATION_PROGRESS;
var recordResult = function recordResult(success) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    result: result,
    success: success,
    type: RECORD
  };
};
exports.recordResult = recordResult;
var authenticationProgress = function authenticationProgress(working) {
  return {
    type: AUTHENTICATION_PROGRESS,
    working: working
  };
};
exports.authenticationProgress = authenticationProgress;
function getResult(state) {
  return state[reducerName].result;
}
function getSuccess(state) {
  return state[reducerName].success;
}
function isAuthenticating(state) {
  return state[reducerName].working;
}