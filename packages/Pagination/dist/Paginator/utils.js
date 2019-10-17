"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPageNumbers = exports.range = void 0;

var range = function range(start) {
  var stop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var begin = start;
  var end;

  if (stop == null) {
    begin = 0;
    end = start;
  } else {
    end = stop;
  }

  return Array(Math.ceil(Math.abs((end - begin) / step))).fill(begin).map(function (x, y) {
    return x + y * step;
  });
};

exports.range = range;

var fetchPageNumbers = function fetchPageNumbers(neighbourPillsNum, totalPages, currentPage) {
  var startPage = Math.max(1, currentPage - neighbourPillsNum);
  var endPage = Math.min(totalPages + 1, currentPage + neighbourPillsNum + 1);
  var numberedPages = range(startPage, endPage);
  return numberedPages;
};

exports.fetchPageNumbers = fetchPageNumbers;