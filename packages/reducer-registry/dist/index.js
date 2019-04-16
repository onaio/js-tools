"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Registry", {
  enumerable: true,
  get: function get() {
    return _registry.Registry;
  }
});
Object.defineProperty(exports, "store", {
  enumerable: true,
  get: function get() {
    return _store.default;
  }
});
Object.defineProperty(exports, "combine", {
  enumerable: true,
  get: function get() {
    return _store.combine;
  }
});
Object.defineProperty(exports, "getStore", {
  enumerable: true,
  get: function get() {
    return _store.getStore;
  }
});
exports.default = void 0;

var _registry = _interopRequireWildcard(require("./registry"));

var _store = _interopRequireWildcard(require("./store"));

var _default = _registry.default;
exports.default = _default;