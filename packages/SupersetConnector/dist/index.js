"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _api = require("./api");

var _auth = require("./auth");

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});
var superset = {
  api: new _api.API(),
  authZ: _auth.authZ,
  deAuthZ: _auth.deAuthZ,
  getFormData: _utils.getFormData,
  processData: _utils.processData
};
var _default = superset;
exports.default = _default;