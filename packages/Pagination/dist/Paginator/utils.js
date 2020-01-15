"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeNumber = void 0;

var sanitizeNumber = function sanitizeNumber(pageNumber, allPages) {
  return Math.min(Math.max(1, pageNumber), allPages);
};

exports.sanitizeNumber = sanitizeNumber;