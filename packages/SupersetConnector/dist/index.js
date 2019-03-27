"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _api = require("./api");

var _auth = require("./auth");

var processData = function processData(res) {
  return res && res.data && res.data.records && Array.isArray(res.data.records) && (0, _toConsumableArray2.default)(res.data.records);
};

var Superset = {
  api: new _api.API(),
  processData: processData,
  authZ: _auth.authZ,
  deAuthZ: _auth.deAuthZ
};
var _default = Superset;
exports.default = _default;