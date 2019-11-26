"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorCallback = errorCallback;
exports.logoutFromAuthServer = logoutFromAuthServer;

var _constants = require("./constants");

function errorCallback(error) {
  throw new Error(error);
}

function logoutFromAuthServer(logoutURL) {
  var logoutWindow = window.open(logoutURL);
  var timer = setInterval(function () {
    if (logoutWindow) {
      logoutWindow.close();
    }

    clearInterval(timer);
  }, _constants.DEFAULT_LOGOUT_DELAY);
}