"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.getResult = getResult;
exports.getSuccess = getSuccess;
exports.recordResult = exports.RECORD = exports.initialState = exports.reducerName = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

var reducerName = 'gatekeeper';
exports.reducerName = reducerName;
var initialState = (0, _seamlessImmutable.default)({
  result: {},
  success: null
});
exports.initialState = initialState;

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECORD:
      return state.merge({
        result: (0, _objectSpread2.default)({}, action.result),
        success: action.success
      });

    default:
      return state;
  }
}

var RECORD = '@onaio/gatekeeper/reducer/RECORD';
exports.RECORD = RECORD;

var recordResult = function recordResult(success) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    result: result,
    success: success,
    type: RECORD
  };
};

exports.recordResult = recordResult;

function getResult(state) {
  return state[reducerName].result;
}

function getSuccess(state) {
  return state[reducerName].success;
}