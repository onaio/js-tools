"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.percentage = percentage;

function percentage(num) {
  var decimalPoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return {
    error: null,
    value: "".concat((num * 100).toFixed(decimalPoints), "%")
  };
}