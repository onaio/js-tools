"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_LOGOUT_DELAY = exports.LOGIN_URL = exports.GENERIC_ERROR = exports.OAUTH2_HTTP_ERROR = exports.OAUTH2_CALLBACK_ERROR = void 0;
var OAUTH2_CALLBACK_ERROR = 'oAuth service oauth2Callback failed, data not returned';
exports.OAUTH2_CALLBACK_ERROR = OAUTH2_CALLBACK_ERROR;
var OAUTH2_HTTP_ERROR = 'oAuth service oauth2Callback failed, HTTP status';
exports.OAUTH2_HTTP_ERROR = OAUTH2_HTTP_ERROR;
var GENERIC_ERROR = 'Something went wrong';
exports.GENERIC_ERROR = GENERIC_ERROR;
var LOGIN_URL = '/login';
exports.LOGIN_URL = LOGIN_URL;
var DEFAULT_LOGOUT_DELAY = 20;
exports.DEFAULT_LOGOUT_DELAY = DEFAULT_LOGOUT_DELAY;