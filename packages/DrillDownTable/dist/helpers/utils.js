"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsFromObjects = columnsFromObjects;

function columnsFromObjects(items) {
  if (items.length < 1) {
    return [];
  }

  return Object.keys(items[0]).map(function (k) {
    return {
      Header: k,
      accessor: k
    };
  });
}