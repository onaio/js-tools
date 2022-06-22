"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "APICallback", {
  enumerable: true,
  get: function get() {
    return _custom.APICallback;
  }
});
Object.defineProperty(exports, "APICallbackProps", {
  enumerable: true,
  get: function get() {
    return _custom.APICallbackProps;
  }
});
Object.defineProperty(exports, "AuthorizationGrantType", {
  enumerable: true,
  get: function get() {
    return _login.AuthorizationGrantType;
  }
});
Object.defineProperty(exports, "Component404", {
  enumerable: true,
  get: function get() {
    return _utils.Component404;
  }
});
Object.defineProperty(exports, "ConnectedAPICallback", {
  enumerable: true,
  get: function get() {
    return _custom["default"];
  }
});
Object.defineProperty(exports, "ConnectedLogout", {
  enumerable: true,
  get: function get() {
    return _logout["default"];
  }
});
Object.defineProperty(exports, "ConnectedOauthCallback", {
  enumerable: true,
  get: function get() {
    return _implicit["default"];
  }
});
Object.defineProperty(exports, "ErrorCallback", {
  enumerable: true,
  get: function get() {
    return _utils2.ErrorCallback;
  }
});
Object.defineProperty(exports, "GateKeeperActionTypes", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.GateKeeperActionTypes;
  }
});
Object.defineProperty(exports, "GateKeeperState", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.GateKeeperState;
  }
});
Object.defineProperty(exports, "ImmutableGateKeeperState", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.ImmutableGateKeeperState;
  }
});
Object.defineProperty(exports, "Logout", {
  enumerable: true,
  get: function get() {
    return _logout.Logout;
  }
});
Object.defineProperty(exports, "LogoutProps", {
  enumerable: true,
  get: function get() {
    return _logout.LogoutProps;
  }
});
Object.defineProperty(exports, "OauthCallback", {
  enumerable: true,
  get: function get() {
    return _implicit.OauthCallback;
  }
});
Object.defineProperty(exports, "OauthCallbackProps", {
  enumerable: true,
  get: function get() {
    return _implicit.OauthCallbackProps;
  }
});
Object.defineProperty(exports, "OauthLogin", {
  enumerable: true,
  get: function get() {
    return _login["default"];
  }
});
Object.defineProperty(exports, "OauthLoginProps", {
  enumerable: true,
  get: function get() {
    return _login.OauthLoginProps;
  }
});
Object.defineProperty(exports, "OauthOptions", {
  enumerable: true,
  get: function get() {
    return _oauth.OauthOptions;
  }
});
Object.defineProperty(exports, "ProviderLinks", {
  enumerable: true,
  get: function get() {
    return _login.ProviderLinks;
  }
});
Object.defineProperty(exports, "ProviderLinksProps", {
  enumerable: true,
  get: function get() {
    return _login.ProviderLinksProps;
  }
});
Object.defineProperty(exports, "Providers", {
  enumerable: true,
  get: function get() {
    return _oauth.Providers;
  }
});
Object.defineProperty(exports, "RECORD", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.RECORD;
  }
});
Object.defineProperty(exports, "RecordAction", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.RecordAction;
  }
});
Object.defineProperty(exports, "RenderErrorComponent", {
  enumerable: true,
  get: function get() {
    return _utils.RenderErrorComponent;
  }
});
Object.defineProperty(exports, "RouteParams", {
  enumerable: true,
  get: function get() {
    return _implicit.RouteParams;
  }
});
Object.defineProperty(exports, "SuccessfulLogin", {
  enumerable: true,
  get: function get() {
    return _utils.SuccessfulLogin;
  }
});
Object.defineProperty(exports, "SuccessfulLoginProps", {
  enumerable: true,
  get: function get() {
    return _utils.SuccessfulLoginProps;
  }
});
Object.defineProperty(exports, "TokenExpired", {
  enumerable: true,
  get: function get() {
    return _TokenExpiry.TokenExpired;
  }
});
Object.defineProperty(exports, "TokenExpiredProps", {
  enumerable: true,
  get: function get() {
    return _TokenExpiry.TokenExpiredProps;
  }
});
Object.defineProperty(exports, "UserInfoFnType", {
  enumerable: true,
  get: function get() {
    return _oauth.UserInfoFnType;
  }
});
Object.defineProperty(exports, "defaultAPICallbackProps", {
  enumerable: true,
  get: function get() {
    return _custom.defaultAPICallbackProps;
  }
});
Object.defineProperty(exports, "defaultLogoutProps", {
  enumerable: true,
  get: function get() {
    return _logout.defaultLogoutProps;
  }
});
Object.defineProperty(exports, "defaultOauthCallbackProps", {
  enumerable: true,
  get: function get() {
    return _implicit.defaultOauthCallbackProps;
  }
});
Object.defineProperty(exports, "errorCallback", {
  enumerable: true,
  get: function get() {
    return _utils2.errorCallback;
  }
});
Object.defineProperty(exports, "fetchUser", {
  enumerable: true,
  get: function get() {
    return _services.fetchUser;
  }
});
Object.defineProperty(exports, "gateKeeperReducer", {
  enumerable: true,
  get: function get() {
    return _gatekeeper["default"];
  }
});
Object.defineProperty(exports, "gateKeeperReducerName", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.reducerName;
  }
});
Object.defineProperty(exports, "getOnadataUserInfo", {
  enumerable: true,
  get: function get() {
    return _oauth.getOnadataUserInfo;
  }
});
Object.defineProperty(exports, "getOpenSRPUserInfo", {
  enumerable: true,
  get: function get() {
    return _oauth.getOpenSRPUserInfo;
  }
});
Object.defineProperty(exports, "getProviderFromOptions", {
  enumerable: true,
  get: function get() {
    return _oauth.getProviderFromOptions;
  }
});
Object.defineProperty(exports, "getResult", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.getResult;
  }
});
Object.defineProperty(exports, "getSuccess", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.getSuccess;
  }
});
Object.defineProperty(exports, "initialGateKeeperState", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.initialState;
  }
});
Object.defineProperty(exports, "isAuthenticating", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.isAuthenticating;
  }
});
Object.defineProperty(exports, "oauth2Callback", {
  enumerable: true,
  get: function get() {
    return _services.oauth2Callback;
  }
});
Object.defineProperty(exports, "recordResult", {
  enumerable: true,
  get: function get() {
    return _gatekeeper.recordResult;
  }
});
Object.defineProperty(exports, "refreshToken", {
  enumerable: true,
  get: function get() {
    return _services.refreshToken;
  }
});
Object.defineProperty(exports, "useOAuthLogin", {
  enumerable: true,
  get: function get() {
    return _login.useOAuthLogin;
  }
});

var _login = _interopRequireWildcard(require("./components/login"));

var _logout = _interopRequireWildcard(require("./components/logout"));

var _implicit = _interopRequireWildcard(require("./components/callback/implicit"));

var _custom = _interopRequireWildcard(require("./components/callback/custom"));

var _utils = require("./components/callback/utils");

var _gatekeeper = _interopRequireWildcard(require("./ducks/gatekeeper"));

var _oauth = require("./helpers/oauth");

var _services = require("./helpers/services");

var _TokenExpiry = require("./components/TokenExpiry");

var _utils2 = require("./helpers/utils");