"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsFromObjects = columnsFromObjects;
exports.defaultDrillDownFilter = void 0;

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

var defaultDrillDownFilter = function defaultDrillDownFilter(props, parentId) {
  var filterByLevel = props.data.filter(function (row) {
    return row[props.parentIdentifierField] === parentId;
  });
  return filterByLevel;
};

exports.defaultDrillDownFilter = defaultDrillDownFilter;