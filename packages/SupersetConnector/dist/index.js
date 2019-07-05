"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = require("./api");

var _auth = require("./auth");

var _utils = require("./utils");

var superset = {
  api: new _api.API(),
  authZ: _auth.authZ,
  deAuthZ: _auth.deAuthZ,
  getFormData: _utils.getFormData,
  processData: _utils.processData
};
var _default = superset;
exports.default = _default;