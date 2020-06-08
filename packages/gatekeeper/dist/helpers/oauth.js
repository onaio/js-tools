"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProviderFromOptions = getProviderFromOptions;
exports.getOnadataUserInfo = getOnadataUserInfo;
exports.getOpenSRPUserInfo = getOpenSRPUserInfo;

var _clientOauth = _interopRequireDefault(require("client-oauth2"));

var _constants = require("./constants");

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

function getOpenSRPUserInfo(apiResponse) {
  if (!apiResponse.username) {
    throw new Error(_constants.OAUTH2_CALLBACK_ERROR);
  }

  return {
    authenticated: true,
    extraData: apiResponse,
    user: {
      email: '',
      gravatar: '',
      name: '',
      username: apiResponse.username
    }
  };
}