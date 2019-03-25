"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.deAuthZ = exports.authZ = void 0;

var authZ = function authZ(config, callback) {
  var headers = new Headers();
  headers.append('Custom-Api-Token', config.token);
  return fetch("".concat(config.base || 'http://localhost:8088/', "oauth-authorized/onadata"), {
    headers: headers,
    method: 'GET',
    credentials: 'include'
  }).then(function (res) {
    return callback(res);
  }).catch(function (err) {
    return callback(err);
  });
};

exports.authZ = authZ;

var deAuthZ = function deAuthZ(config, callback) {
  return fetch("".concat(config && config.base || 'http://localhost:8088/', "logout/"), {
    method: 'GET',
    credentials: 'include'
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