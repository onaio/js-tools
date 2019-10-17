"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paginator = require("./Paginator/paginator");

Object.keys(_paginator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _paginator[key];
    }
  });
});

var _routedPaginator = require("./Paginator/routedPaginator");

Object.keys(_routedPaginator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _routedPaginator[key];
    }
  });
});