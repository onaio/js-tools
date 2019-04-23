"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oauth2Callback = oauth2Callback;
exports.fetchUser = fetchUser;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sessionReducer = require("@onaio/session-reducer");

var _constants = require("./constants");

var _oauth = require("./oauth");

var _utils = require("./utils");

function oauth2Callback(_x, _x2, _x3, _x4) {
  return _oauth2Callback.apply(this, arguments);
}

function _oauth2Callback() {
  _oauth2Callback = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(locationHash, url, provider, userInfoCallback) {
    var method,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            method = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : 'GET';
            return _context2.abrupt("return", provider.token.getToken(locationHash).then(function () {
              var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(oAuthObject) {
                var response, data;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return fetch(url, oAuthObject.sign({
                          method: method,
                          url: url
                        }));

                      case 2:
                        response = _context.sent;

                        if (response.ok) {
                          _context.next = 5;
                          break;
                        }

                        throw new Error("".concat(_constants.OAUTH2_HTTP_ERROR, " ").concat(response.status));

                      case 5:
                        _context.next = 7;
                        return response.json();

                      case 7:
                        data = _context.sent;
                        return _context.abrupt("return", userInfoCallback(data));

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x8) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _oauth2Callback.apply(this, arguments);
}

function fetchUser(_x5, _x6, _x7) {
  return _fetchUser.apply(this, arguments);
}

function _fetchUser() {
  _fetchUser = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(locationHash, url, provider) {
    var authenticateActionCreator,
        userInfoCallback,
        errorCallbackFn,
        method,
        userInfo,
        authenticated,
        user,
        extraData,
        _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            authenticateActionCreator = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : _sessionReducer.authenticateUser;
            userInfoCallback = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : _oauth.getOnadataUserInfo;
            errorCallbackFn = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : _utils.errorCallback;
            method = _args3.length > 6 && _args3[6] !== undefined ? _args3[6] : 'GET';
            _context3.prev = 4;
            _context3.next = 7;
            return oauth2Callback(locationHash, url, provider, userInfoCallback, method);

          case 7:
            userInfo = _context3.sent;

            if (userInfo) {
              authenticated = userInfo.authenticated, user = userInfo.user, extraData = userInfo.extraData;
              authenticateActionCreator(authenticated, user, extraData);
            } else {
              errorCallbackFn(_constants.GENERIC_ERROR);
            }

            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](4);
            errorCallbackFn(_context3.t0.message);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 11]]);
  }));
  return _fetchUser.apply(this, arguments);
}