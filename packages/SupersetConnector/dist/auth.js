"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.deAuthZ = exports.authZ = void 0;

var _constants = require("./constants");

var authZ = function authZ(config, callback) {
  var headers = new Headers();
  headers.append('Custom-Api-Token', config.token);
  return fetch("".concat(config.base || _constants.DEFAULT_SUPERSET_URL, "oauth-authorized/").concat(config.provider || _constants.DEFAULT_SUPERSET_PROVIDER), {
    credentials: 'include',
    headers: headers,
    method: 'GET'
  }).then(function (res) {
    return callback(res);
  }).catch(function (err) {
    return callback(err);
  });
};

exports.authZ = authZ;

var deAuthZ = function deAuthZ(config, callback) {
  return fetch("".concat(config && config.base || _constants.DEFAULT_SUPERSET_URL, "logout/"), {
    credentials: 'include',
    method: 'GET'
  }).then(function (res) {
    return callback(res);
  }).catch(function (err) {
    return callback(err);
  });
};

exports.deAuthZ = deAuthZ;
var _default = {
  authZ: authZ,
  deAuthZ: deAuthZ
};
exports.default = _default;