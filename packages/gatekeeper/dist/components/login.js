"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOAuthLogin = useOAuthLogin;
exports["default"] = exports.ProviderLinks = exports.AuthorizationGrantType = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../helpers/constants");

var _oauth = require("../helpers/oauth");

var AuthorizationGrantType;
exports.AuthorizationGrantType = AuthorizationGrantType;

(function (AuthorizationGrantType) {
  AuthorizationGrantType["IMPLICIT"] = "IMPLICIT";
  AuthorizationGrantType["AUTHORIZATION_CODE"] = "AUTHORIZATION_CODE";
})(AuthorizationGrantType || (exports.AuthorizationGrantType = AuthorizationGrantType = {}));

function useOAuthLogin(options) {
  var rawProviders = options.providers,
      authorizationGrantType = options.authorizationGrantType;
  var authorizationUris = {};
  Object.entries(rawProviders).map(function (item) {
    var thisProvider = (0, _oauth.getProviderFromOptions)(item[1]);
    var authorizationUri = authorizationGrantType === AuthorizationGrantType.IMPLICIT ? thisProvider.token.getUri() : authorizationGrantType === AuthorizationGrantType.AUTHORIZATION_CODE ? thisProvider.code.getUri() : '#';
    authorizationUris[item[0]] = authorizationUri;
    return authorizationUris;
  });
  return authorizationUris;
}

var ProviderLinks = function ProviderLinks(props) {
  var providers = props.providers,
      authorizationGrantType = props.authorizationGrantType,
      OAuthLoginPromptMessage = props.OAuthLoginPromptMessage;
  var authorizationUris = useOAuthLogin({
    authorizationGrantType: authorizationGrantType,
    providers: providers
  });
  return _react["default"].createElement("div", {
    className: "gatekeeper-login"
  }, _react["default"].createElement("p", {
    className: "gatekeeper-p"
  }, OAuthLoginPromptMessage), Object.entries(authorizationUris).map(function (item) {
    return _react["default"].createElement("p", {
      className: "gatekeeper-p item",
      key: item[0]
    }, _react["default"].createElement("a", {
      className: "gatekeeper-btn",
      href: item[1]
    }, item[0]));
  }));
};

exports.ProviderLinks = ProviderLinks;

var OauthLogin = function OauthLogin(props) {
  var providers = props.providers,
      ProviderLinksComponent = props.ProviderLinksComponent,
      authorizationGrantType = props.authorizationGrantType,
      noProvidersMessage = props.noProvidersMessage,
      OAuthLoginPromptMessage = props.OAuthLoginPromptMessage;
  return ProviderLinksComponent && providers ? _react["default"].createElement(ProviderLinksComponent, {
    providers: providers,
    authorizationGrantType: authorizationGrantType,
    OAuthLoginPromptMessage: OAuthLoginPromptMessage
  }) : _react["default"].createElement("div", {
    className: "gatekeeper-login"
  }, _react["default"].createElement("p", {
    className: "gatekeeper-p"
  }, noProvidersMessage));
};

OauthLogin.defaultProps = {
  OAuthLoginPromptMessage: _constants.OAUTH_LOGIN_PROMPT,
  ProviderLinksComponent: ProviderLinks,
  authorizationGrantType: AuthorizationGrantType.IMPLICIT,
  noProvidersMessage: _constants.NO_PROVIDERS
};
var _default = OauthLogin;
exports["default"] = _default;