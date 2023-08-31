"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOnadataUserInfo = getOnadataUserInfo;
exports.getOpenSRPUserInfo = getOpenSRPUserInfo;
exports.getProviderFromOptions = getProviderFromOptions;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _clientOauth = _interopRequireDefault(require("client-oauth2"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _constants = require("./constants");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var addSecToCurrentTime = function addSecToCurrentTime(seconds, baseDate) {
  var date = baseDate && !isNaN(baseDate.getTime()) ? baseDate : new Date(Date.now());
  return !isNaN(Number(seconds)) ? new Date(date.setSeconds(date.getSeconds() + Number(seconds))).toISOString() : null;
};
function getOpenSRPUserInfo(apiRes) {
  var _realm_access$roles;
  var accessToken = apiRes.oAuth2Data.access_token;
  if (!accessToken) {
    throw new Error(_constants.OAUTH2_CALLBACK_ERROR);
  }
  var tokenClaims = _jsonwebtoken["default"].decode(accessToken);
  if (!tokenClaims) {
    throw new Error(_constants.OAUTH2_CALLBACK_ERROR);
  }
  var email_verified = tokenClaims.email_verified,
    given_name = tokenClaims.given_name,
    family_name = tokenClaims.family_name,
    preferred_username = tokenClaims.preferred_username,
    realm_access = tokenClaims.realm_access,
    resource_access = tokenClaims.resource_access,
    sub = tokenClaims.sub,
    name = tokenClaims.name;
  var resourceAccessRoles = {};
  Object.entries(resource_access !== null && resource_access !== void 0 ? resource_access : {}).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      clientID = _ref2[0],
      rolesObj = _ref2[1];
    resourceAccessRoles[clientID] = rolesObj.roles;
  });
  var apiResponse = {
    roles: {
      realmAccess: (_realm_access$roles = realm_access === null || realm_access === void 0 ? void 0 : realm_access.roles) !== null && _realm_access$roles !== void 0 ? _realm_access$roles : [],
      clientRoles: resourceAccessRoles
    },
    email: null,
    username: preferred_username,
    user_id: sub,
    preferred_name: name,
    family_name: family_name,
    given_name: given_name,
    email_verified: email_verified,
    oAuth2Data: apiRes.oAuth2Data
  };
  var _apiResponse$oAuth2Da = apiResponse.oAuth2Data,
    expires_in = _apiResponse$oAuth2Da.expires_in,
    refresh_expires_in = _apiResponse$oAuth2Da.refresh_expires_in;
  var authTime = new Date(tokenClaims.iat * 1000);
  var tokenExpiryTime = addSecToCurrentTime(expires_in, authTime);
  var refreshExpiryTime = addSecToCurrentTime(refresh_expires_in, authTime);
  var responseCopy = _objectSpread({}, apiResponse);
  responseCopy = _objectSpread(_objectSpread({}, responseCopy), {}, {
    oAuth2Data: _objectSpread(_objectSpread(_objectSpread({}, apiResponse.oAuth2Data), tokenExpiryTime && {
      token_expires_at: tokenExpiryTime
    }), refreshExpiryTime && {
      refresh_expires_at: refreshExpiryTime
    })
  });
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