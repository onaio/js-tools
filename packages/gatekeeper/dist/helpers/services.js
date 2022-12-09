"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchState = void 0;
exports.fetchUser = fetchUser;
exports.oauth2Callback = oauth2Callback;
exports.refreshToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sessionReducer = require("@onaio/session-reducer");

var _gatekeeper = require("../ducks/gatekeeper");

var _constants = require("./constants");

var _oauth = require("./oauth");

var _utils = require("./utils");

function oauth2Callback(_x, _x2, _x3, _x4) {
  return _oauth2Callback.apply(this, arguments);
}

function _oauth2Callback() {
  _oauth2Callback = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(urlObject, url, provider, userInfoCallback) {
    var method,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            method = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : 'GET';
            return _context4.abrupt("return", provider.token.getToken(urlObject).then(function () {
              var _ref5 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(oAuthObject) {
                var response, data;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return fetch(url, oAuthObject.sign({
                          method: method,
                          url: url
                        }));

                      case 2:
                        response = _context3.sent;

                        if (response.ok) {
                          _context3.next = 5;
                          break;
                        }

                        throw new Error("".concat(_constants.OAUTH2_HTTP_ERROR, " ").concat(response.status));

                      case 5:
                        _context3.next = 7;
                        return response.json();

                      case 7:
                        data = _context3.sent;
                        data.oAuth2Data = oAuthObject.data;
                        return _context3.abrupt("return", userInfoCallback(data));

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x13) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _oauth2Callback.apply(this, arguments);
}

function fetchUser(_x5, _x6, _x7) {
  return _fetchUser.apply(this, arguments);
}

function _fetchUser() {
  _fetchUser = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5(urlObject, resourceUrl, provider) {
    var authenticateActionCreator,
        recordResultActionCreator,
        userInfoCallback,
        errorCallbackFn,
        method,
        responseInfo,
        authenticated,
        user,
        extraData,
        _args5 = arguments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            authenticateActionCreator = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : _sessionReducer.authenticateUser;
            recordResultActionCreator = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : _gatekeeper.recordResult;
            userInfoCallback = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : _oauth.getOnadataUserInfo;
            errorCallbackFn = _args5.length > 6 && _args5[6] !== undefined ? _args5[6] : _utils.errorCallback;
            method = _args5.length > 7 && _args5[7] !== undefined ? _args5[7] : 'GET';
            _context5.prev = 5;
            _context5.next = 8;
            return oauth2Callback(urlObject, resourceUrl, provider, userInfoCallback, method);

          case 8:
            responseInfo = _context5.sent;

            if (responseInfo) {
              authenticated = responseInfo.authenticated, user = responseInfo.user, extraData = responseInfo.extraData;
              authenticateActionCreator(authenticated, user, extraData);
              recordResultActionCreator(true, extraData);
            } else {
              recordResultActionCreator(false, {
                error: _constants.GENERIC_ERROR
              });
              errorCallbackFn(_constants.GENERIC_ERROR);
            }

            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](5);
            recordResultActionCreator(false, {
              error: _context5.t0
            });
            errorCallbackFn(_context5.t0.message);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[5, 12]]);
  }));
  return _fetchUser.apply(this, arguments);
}

var fetchState = function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(url, _ref) {
    var _ref$authenticateActi, authenticateActionCreator, _ref$recordResultActi, recordResultActionCreator, _ref$authenticationPr, authenticationProgressCreator, _ref$errorCallbackFn, errorCallbackFn, _ref$logoutActionCrea, logoutActionCreator;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$authenticateActi = _ref.authenticateActionCreator, authenticateActionCreator = _ref$authenticateActi === void 0 ? _sessionReducer.authenticateUser : _ref$authenticateActi, _ref$recordResultActi = _ref.recordResultActionCreator, recordResultActionCreator = _ref$recordResultActi === void 0 ? _gatekeeper.recordResult : _ref$recordResultActi, _ref$authenticationPr = _ref.authenticationProgressCreator, authenticationProgressCreator = _ref$authenticationPr === void 0 ? _gatekeeper.authenticationProgress : _ref$authenticationPr, _ref$errorCallbackFn = _ref.errorCallbackFn, errorCallbackFn = _ref$errorCallbackFn === void 0 ? _utils.errorCallback : _ref$errorCallbackFn, _ref$logoutActionCrea = _ref.logoutActionCreator, logoutActionCreator = _ref$logoutActionCrea === void 0 ? _sessionReducer.logOutUser : _ref$logoutActionCrea;
            authenticationProgressCreator(true);
            fetch(url).then(function (res) {
              if (res.ok) {
                return res.json();
              } else {
                authenticationProgressCreator(false);
                throw new Error('fetching state failed');
              }
            }).then(function (data) {
              var session = data.session;

              if (!session) {
                logoutActionCreator();
                throw new Error('User is logged out');
              }

              var authenticated = session.authenticated,
                  user = session.user,
                  extraData = session.extraData;
              authenticateActionCreator(authenticated, user, extraData);
              recordResultActionCreator(true, extraData);
              authenticationProgressCreator(false);
            })["catch"](function (err) {
              recordResultActionCreator(false, {
                err: err
              });
              authenticationProgressCreator(false);
              errorCallbackFn(err);
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchState(_x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();

exports.fetchState = fetchState;

var refreshToken = function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(url, dispatch, _ref3) {
    var _ref3$authenticateAct, authenticateActionCreator, _ref3$errorCallbackFn, errorCallbackFn, _ref3$recordResultAct, recordResultActionCreator;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref3$authenticateAct = _ref3.authenticateActionCreator, authenticateActionCreator = _ref3$authenticateAct === void 0 ? _sessionReducer.authenticateUser : _ref3$authenticateAct, _ref3$errorCallbackFn = _ref3.errorCallbackFn, errorCallbackFn = _ref3$errorCallbackFn === void 0 ? _utils.errorCallback : _ref3$errorCallbackFn, _ref3$recordResultAct = _ref3.recordResultActionCreator, recordResultActionCreator = _ref3$recordResultAct === void 0 ? _gatekeeper.recordResult : _ref3$recordResultAct;
            return _context2.abrupt("return", fetch(url).then(function (res) {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error(_constants.TOKEN_REFRESH_FAILED);
              }
            }).then(function (data) {
              var _extraData$oAuth2Data;

              var session = data.session;

              if (!session) {
                throw new Error(_constants.TOKEN_REFRESH_FAILED);
              }

              var authenticated = session.authenticated,
                  user = session.user,
                  extraData = session.extraData;
              var access_token = extraData === null || extraData === void 0 ? void 0 : (_extraData$oAuth2Data = extraData.oAuth2Data) === null || _extraData$oAuth2Data === void 0 ? void 0 : _extraData$oAuth2Data.access_token;
              dispatch(authenticateActionCreator(authenticated, user, extraData));
              dispatch(recordResultActionCreator(true, extraData));
              return access_token;
            })["catch"](function (err) {
              errorCallbackFn(err);
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function refreshToken(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.refreshToken = refreshToken;