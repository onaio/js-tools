"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorCallback = errorCallback;
function errorCallback(error) {
  throw new Error(error);
}