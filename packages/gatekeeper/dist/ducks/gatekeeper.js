"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;
exports.getResult = getResult;
exports.getSuccess = getSuccess;
exports.isAuthenticating = isAuthenticating;
exports.authenticationProgress = exports.recordResult = exports.AUTHENTICATION_PROGRESS = exports.RECORD = exports.initialState = exports.reducerName = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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