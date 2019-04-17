"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.isAuthenticated = isAuthenticated;
exports.getExtraData = getExtraData;
exports.getUser = getUser;
exports.logOutUser = exports.authenticateUser = exports.LOGOUT = exports.AUTHENTICATE = exports.initialState = exports.reducerName = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

var reducerName = 'session';
exports.reducerName = reducerName;
var initialState = (0, _seamlessImmutable.default)({
  authenticated: false,
  extraData: {},
  user: {
    email: '',
    gravatar: '',
    name: '',
    username: ''
  }
});
exports.initialState = initialState;

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case AUTHENTICATE:
      return state.merge({
        authenticated: action.authenticated,
        extraData: (0, _objectSpread2.default)({}, action.extraData),
        user: (0, _objectSpread2.default)({}, action.user)
      });

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}

var AUTHENTICATE = '@onaio/session-reducer/reducer/AUTHENTICATE';
exports.AUTHENTICATE = AUTHENTICATE;
var LOGOUT = '@onaio/session-reducer/reducer/LOGOUT';
exports.LOGOUT = LOGOUT;

var authenticateUser = function authenticateUser(authenticated, user) {
  var extraData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return {
    authenticated: authenticated,
    extraData: extraData,
    type: AUTHENTICATE,
    user: user
  };
};

exports.authenticateUser = authenticateUser;

var logOutUser = function logOutUser() {
  return {
    type: LOGOUT
  };
};

exports.logOutUser = logOutUser;

function isAuthenticated(state) {
  return state[reducerName].authenticated;
}

function getExtraData(state) {
  return state[reducerName].extraData;
}

function getUser(state) {
  return state[reducerName].user;
}