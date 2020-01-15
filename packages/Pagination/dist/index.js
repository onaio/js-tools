"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Paginator = require("./Paginator");

Object.keys(_Paginator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Paginator[key];
    }
  });
});