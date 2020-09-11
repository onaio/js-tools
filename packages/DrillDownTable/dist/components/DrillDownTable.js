"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrillDownTable = DrillDownTable;
exports.defaultDrillDownTableProps = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _HelperComponents = require("./HelperComponents");

var _TableJSX = require("./TableJSX");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultDrillDownTableProps = _objectSpread({}, _TableJSX.defaultTableProps, {
  CellComponent: _HelperComponents.DropDownCell,
  loading: false,
  loadingComponent: _HelperComponents.Spinner
});

exports.defaultDrillDownTableProps = defaultDrillDownTableProps;

function DrillDownTable(props) {
  var columns = props.columns,
      data = props.data,
      parentIdentifierField = props.parentIdentifierField,
      hasChildren = props.hasChildren,
      LoadingComponent = props.loadingComponent;
  var parentNodes = data && parentIdentifierField ? data.map(function (el) {
    return el[parentIdentifierField];
  }) : [];

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      pageData = _useState2[0],
      setPageData = _useState2[1];

  var mutatedColumns = _react["default"].useMemo(function () {
    return columns.map(mutateColumns);
  }, [columns]);

  var fetchData = _react["default"].useCallback(function (_ref) {
    var skipPageResetRef = _ref.skipPageResetRef,
        parentId = _ref.currentParentId;
    skipPageResetRef.current = true;
    var filterByLevel = props.data;

    if (props.useDrillDown) {
      filterByLevel = props.data.filter(function (row) {
        return row[parentIdentifierField] === parentId;
      });
    }

    setPageData(filterByLevel);
  }, [data]);

  function mutateColumns(el) {
    var linkerField = props.linkerField,
        CellComponent = props.CellComponent,
        extraCellProps = props.extraCellProps;

    if (el.hasOwnProperty('columns') && el.columns && el.columns.length > 0) {
      var newColumns = el.columns.map(mutateColumns);
      el.columns = newColumns;
    }

    if (el.accessor === linkerField) {
      el.Cell = function (cell) {
        if (CellComponent !== undefined) {
          var identifierField = props.identifierField;
          var thisCellHasChildren = false;

          if (hasChildren && identifierField && hasChildren(cell, parentNodes, identifierField)) {
            thisCellHasChildren = true;
          }

          var cellProps = {
            cell: cell,
            cellValue: cell.value,
            hasChildren: thisCellHasChildren
          };

          if (extraCellProps !== undefined) {
            Object.assign(cellProps, extraCellProps);
          }

          return _react["default"].createElement(CellComponent, cellProps);
        }

        return cell.value;
      };
    }

    return el;
  }

  var TableProps = _objectSpread({}, props, {
    columns: mutatedColumns,
    data: pageData,
    fetchData: fetchData,
    parentNodes: parentNodes
  });

  return _react["default"].createElement(_react["default"].Fragment, null, !props.loading ? _react["default"].createElement(_TableJSX.Table, TableProps) : _react["default"].createElement(LoadingComponent, null));
}

DrillDownTable.defaultProps = defaultDrillDownTableProps;