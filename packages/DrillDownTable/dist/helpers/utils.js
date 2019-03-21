"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsFromObject = columnsFromObject;

function columnsFromObject(item) {
  var columnsList = [];

  var _arr = Object.keys(item);

  for (var _i = 0; _i < _arr.length; _i++) {
    var field = _arr[_i];
    var columnItem = {
      Header: field,
      accessor: field
    };
    columnsList.push(columnItem);
  }

  return columnsList;
}