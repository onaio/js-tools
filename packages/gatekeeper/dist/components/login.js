"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProviderLinks = void 0;

var _react = _interopRequireDefault(require("react"));

var _oauth = require("../helpers/oauth");

var ProviderLinks = function ProviderLinks(props) {
  var providers = props.providers;
  return _react.default.createElement("div", {
    className: "gatekeeper-login"
  }, _react.default.createElement("p", {
    className: "gatekeeper-p"
  }, "Please log in with one of the following providers"), Object.entries(providers).map(function (item) {
    var thisProvider = (0, _oauth.getProviderFromOptions)(item[1]);
    return _react.default.createElement("p", {
      className: "gatekeeper-p item",
      key: item[0]
    }, _react.default.createElement("a", {
      className: "gatekeeper-btn",
      href: thisProvider.token.getUri()
    }, item[0]));
  }));
};

exports.ProviderLinks = ProviderLinks;

var OauthLogin = function OauthLogin(props) {
  var providers = props.providers,
      ProviderLinksComponent = props.ProviderLinksComponent;
  return ProviderLinksComponent && providers ? _react.default.createElement(ProviderLinksComponent, {
    providers: providers
  }) : _react.default.createElement("div", {
    className: "gatekeeper-login"
  }, _react.default.createElement("p", {
    className: "gatekeeper-p"
  }, "No providers"));
};

OauthLogin.defaultProps = {
  ProviderLinksComponent: ProviderLinks
};
var _default = OauthLogin;
exports.default = _default;