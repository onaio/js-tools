"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;
exports.isAuthenticated = isAuthenticated;
exports.getExtraData = getExtraData;
exports.getUser = getUser;
exports.getRefreshToken = getRefreshToken;
exports.getTokenExiryStatus = getTokenExiryStatus;
exports.getRefreshTokenExpiryStatus = getRefreshTokenExpiryStatus;
exports.getApiToken = getApiToken;
exports.getAccessToken = getAccessToken;
exports.isTokenExpired = isTokenExpired;
exports.getOauthProviderState = getOauthProviderState;
exports.getTokenOrRedirect = exports.logOutUser = exports.updateExtraData = exports.authenticateUser = exports.LOGOUT = exports.UPDATE_DATA = exports.AUTHENTICATE = exports.initialState = exports.TokenStatus = exports.reducerName = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _connectedReducerRegistry = require("@onaio/connected-reducer-registry");

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var reducerName = 'session';
exports.reducerName = reducerName;
var TokenStatus;
exports.TokenStatus = TokenStatus;

(function (TokenStatus) {
  TokenStatus["expired"] = "Expired";
  TokenStatus["active"] = "Active";
  TokenStatus["timeNotFound"] = "Expiry Time Not Found";
})(TokenStatus || (exports.TokenStatus = TokenStatus = {}));

var initialState = (0, _seamlessImmutable["default"])({
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
        extraData: _objectSpread({}, action.extraData),
        user: _objectSpread({}, action.user)
      });

    case UPDATE_DATA:
      return state.merge(_objectSpread({}, state, {
        extraData: _objectSpread({}, state.extraData, {}, action.data)
      }));

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}

var AUTHENTICATE = '@onaio/session-reducer/reducer/AUTHENTICATE';
exports.AUTHENTICATE = AUTHENTICATE;
var UPDATE_DATA = '@onaio/session-reducer/reducer/UPDATE_DATA';
exports.UPDATE_DATA = UPDATE_DATA;
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

var updateExtraData = function updateExtraData(data) {
  return {
    data: data,
    type: UPDATE_DATA
  };
};

exports.updateExtraData = updateExtraData;

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

function getRefreshToken(state) {
  var extraData = state[reducerName].extraData;

  if (extraData.oAuth2Data && extraData.oAuth2Data.refresh_token) {
    return extraData.oAuth2Data.refresh_token;
  }

  return null;
}

function getTokenExiryStatus(state) {
  var extraData = state[reducerName].extraData;

  if (extraData.oAuth2Data && extraData.oAuth2Data.token_expires_at) {
    return new Date(Date.now()) >= new Date(extraData.oAuth2Data.token_expires_at) ? TokenStatus.expired : TokenStatus.active;
  }

  return TokenStatus.timeNotFound;
}

function getRefreshTokenExpiryStatus(state) {
  var extraData = state[reducerName].extraData;

  if (extraData.oAuth2Data && extraData.oAuth2Data.refresh_expires_at) {
    return new Date(Date.now()) >= new Date(extraData.oAuth2Data.refresh_expires_at) ? TokenStatus.expired : TokenStatus.active;
  }

  return TokenStatus.timeNotFound;
}

function getApiToken(state) {
  var extraData = state[reducerName].extraData;
  return extraData.api_token || null;
}

function getAccessToken(state) {
  var extraData = state[reducerName].extraData;

  if (extraData.oAuth2Data && extraData.oAuth2Data.access_token) {
    return extraData.oAuth2Data.access_token;
  }

  return null;
}

function isTokenExpired(state) {
  return !getAccessToken(state) ? true : getTokenExiryStatus(state) === TokenStatus.expired;
}

var getTokenOrRedirect = function getTokenOrRedirect(state) {
  var redirectTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var tokenStatus = getTokenExiryStatus(state);

  if (tokenStatus === TokenStatus.expired && redirectTo) {
    return _connectedReducerRegistry.history.push(redirectTo);
  }

  return getAccessToken(state);
};

exports.getTokenOrRedirect = getTokenOrRedirect;

function getOauthProviderState(state) {
  var extraData = state[reducerName].extraData;

  if (extraData.oAuth2Data && extraData.oAuth2Data.state) {
    return extraData.oAuth2Data.state;
  }

  return null;
}