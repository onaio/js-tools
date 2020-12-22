"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProviderFromOptions = getProviderFromOptions;
exports.getOnadataUserInfo = getOnadataUserInfo;
exports.getOpenSRPUserInfo = getOpenSRPUserInfo;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _clientOauth = _interopRequireDefault(require("client-oauth2"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getProviderFromOptions(options) {
  var accessTokenUri = options.accessTokenUri,
      authorizationUri = options.authorizationUri,
      clientId = options.clientId,
      redirectUri = options.redirectUri,
      scopes = options.scopes,
      state = options.state;
  return new _clientOauth["default"]({
    accessTokenUri: accessTokenUri,
    authorizationUri: authorizationUri,
    clientId: clientId,
    redirectUri: redirectUri,
    scopes: scopes,
    state: state
  });
}

function getOnadataUserInfo(apiResponse) {
  if (!apiResponse.username || !apiResponse.api_token) {
    throw new Error(_constants.OAUTH2_CALLBACK_ERROR);
  }

  return {
    authenticated: true,
    extraData: apiResponse,
    user: {
      email: apiResponse.email || '',
      gravatar: apiResponse.gravatar || '',
      name: apiResponse.name || '',
      username: apiResponse.username
    }
  };
}

var addSecToCurrentTime = function addSecToCurrentTime(seconds) {
  var date = new Date(Date.now());
  return !isNaN(Number(seconds)) ? new Date(date.setSeconds(date.getSeconds() + Number(seconds))).toISOString() : null;
};

function getOpenSRPUserInfo(apiResponse) {
  if (!apiResponse.username) {
    throw new Error(_constants.OAUTH2_CALLBACK_ERROR);
  }

  var responseCopy = _objectSpread({}, apiResponse);

  if (apiResponse.oAuth2Data) {
    var _apiResponse$oAuth2Da = apiResponse.oAuth2Data,
        expires_in = _apiResponse$oAuth2Da.expires_in,
        refresh_expires_in = _apiResponse$oAuth2Da.refresh_expires_in;
    var tokenExpiryTime = addSecToCurrentTime(expires_in);
    var refreshExpiryTime = addSecToCurrentTime(refresh_expires_in);
    responseCopy = _objectSpread({}, responseCopy, {
      oAuth2Data: _objectSpread({}, apiResponse.oAuth2Data, {}, tokenExpiryTime && {
        refresh_expires_at: tokenExpiryTime
      }, {}, refreshExpiryTime && {
        token_expires_at: refreshExpiryTime
      })
    });
  }

  return {
    authenticated: true,
    extraData: responseCopy,
    user: {
      email: '',
      gravatar: '',
      name: '',
      username: apiResponse.username
    }
  };
}