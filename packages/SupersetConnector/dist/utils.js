"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormData = getFormData;
exports.processData = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var processData = function processData(res) {
  return res && res.data && res.data.records && Array.isArray(res.data.records) && (0, _toConsumableArray2.default)(res.data.records);
};

exports.processData = processData;
var defaultFilter = {
  clause: 'WHERE',
  expressionType: 'SIMPLE'
};

function getFormData() {
  var rowLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ordering = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var adhocFilters = filters.map(function (filter) {
    if (filter.hasOwnProperty('sqlExpression')) {
      filter = filter;
      return (0, _objectSpread2.default)({}, defaultFilter, {
        expressionType: 'SQL',
        sqlExpression: filter.sqlExpression
      });
    } else {
      filter = filter;
      return (0, _objectSpread2.default)({}, defaultFilter, {
        comparator: filter.comparator,
        operator: filter.operator,
        subject: filter.subject
      });
    }
  });
  var orderByCols = Object.keys(ordering).map(function (key) {
    return "[\"".concat(key, "\",+").concat(ordering[key].toString(), "]");
  });
  return (0, _objectSpread2.default)({}, orderByCols.length > 0 && {
    order_by_cols: orderByCols
  }, adhocFilters.length > 0 && {
    adhoc_filters: adhocFilters
  }, {
    row_limit: rowLimit
  });
}