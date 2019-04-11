"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasChildrenFunc = hasChildrenFunc;
Object.defineProperty(exports, "DropDownCell", {
  enumerable: true,
  get: function get() {
    return _DropDownCell.default;
  }
});
Object.defineProperty(exports, "DropDownCellProps", {
  enumerable: true,
  get: function get() {
    return _DropDownCell.DropDownCellProps;
  }
});
Object.defineProperty(exports, "WithHeaders", {
  enumerable: true,
  get: function get() {
    return _WithHeaders.default;
  }
});
Object.defineProperty(exports, "getColumns", {
  enumerable: true,
  get: function get() {
    return _WithHeaders.getColumns;
  }
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactTable = _interopRequireDefault(require("react-table"));

require("./DrillDownTable.css");

var _constants = require("./helpers/constants");

var _DropDownCell = _interopRequireWildcard(require("./helpers/DropDownCell"));

var _WithHeaders = _interopRequireWildcard(require("./WithHeaders"));

function hasChildrenFunc(currentObject, parentIdList) {
  var idField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  return parentIdList.includes(currentObject.original[idField]);
}

function DrillDownTable(props) {
  var data = props.data,
      hasChildren = props.hasChildren,
      parentIdentifierField = props.parentIdentifierField,
      useDrillDownTrProps = props.useDrillDownTrProps;
  var columns = (0, _WithHeaders.getColumns)(props);

  var _useState = (0, _react.useState)(props.rootParentId),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currentParentId = _useState2[0],
      setCurrentParentId = _useState2[1];

  var _useState3 = (0, _react.useState)(props.data),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 1),
      originalData = _useState4[0];

  var _useState5 = (0, _react.useState)(data && parentIdentifierField ? data.map(function (el) {
    return el[parentIdentifierField];
  }) : []),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 1),
      parentNodes = _useState6[0];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      previousParentId = _useState8[0],
      setPreviousParentId = _useState8[1];

  (0, _react.useEffect)(function () {
    if (props.rootParentId != null && props.rootParentId !== currentParentId) {
      setPreviousParentId(currentParentId);
      setCurrentParentId(props.rootParentId);
    }
  });

  function filterForLevel(element) {
    if (this.props.parentIdentifierField && element.hasOwnProperty(this.props.parentIdentifierField)) {
      return element[this.props.parentIdentifierField] === this.state.currentParentId;
    }

    return false;
  }

  function getLevelData() {
    var currentState = {
      currentParentId: currentParentId
    };
    var customThis = {
      props: props,
      state: currentState
    };

    if (data) {
      return data.filter(filterForLevel, customThis);
    }

    return data;
  }

  var drillDownTrProps = function drillDownTrProps(row, instance) {
    var getTrProps = props.getTrProps;

    if (getTrProps !== undefined) {
      return getTrProps;
    }

    return {
      onClick: function onClick() {
        if (props.identifierField && props.parentIdentifierField) {
          if (hasChildren && hasChildren(instance, parentNodes, props.identifierField) === true) {
            var newParentId = instance.original[props.identifierField];
            var oldParentId = instance.original[props.parentIdentifierField];
            setCurrentParentId(newParentId);
            setPreviousParentId(oldParentId);
          }
        }
      },
      row: row
    };
  };

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
          var _identifierField = props.identifierField;
          var thisCellHasChildren = false;

          if (hasChildren && _identifierField && hasChildren(cell, parentNodes, _identifierField)) {
            thisCellHasChildren = true;
          }

          var cellProps = {
            cellValue: cell.value,
            hasChildren: thisCellHasChildren
          };

          if (extraCellProps !== undefined) {
            Object.assign(cellProps, extraCellProps);
          }

          return _react.default.createElement(CellComponent, cellProps);
        }

        return cell.value;
      };
    }

    return el;
  }

  var nextLevelData = getLevelData();
  var newProps = {};

  if (useDrillDownTrProps === true) {
    newProps.getTrProps = drillDownTrProps;
  }

  Object.assign(newProps, props);
  newProps.columns = columns.map(mutateColumns);

  if (nextLevelData && nextLevelData.length > 0) {
    newProps.data = nextLevelData;
  }

  return _react.default.createElement(_reactTable.default, newProps);
}

DrillDownTable.defaultProps = {
  CellComponent: _DropDownCell.default,
  hasChildren: hasChildrenFunc,
  identifierField: _constants.ID,
  linkerField: _constants.ID,
  parentIdentifierField: _constants.PARENT_ID,
  rootParentId: _constants.ROOT_PARENT_ID,
  useDrillDownTrProps: true
};
var _default = DrillDownTable;
exports.default = _default;