"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsFromObject = columnsFromObject;

function columnsFromObject(item) {
  var columnsList = [];

  for (var _i = 0, _Object$keys = Object.keys(item); _i < _Object$keys.length; _i++) {
    var field = _Object$keys[_i];
    var columnItem = {
      Header: field,
      accessor: field
    };
    columnsList.push(columnItem);
  }

  return columnsList;
}