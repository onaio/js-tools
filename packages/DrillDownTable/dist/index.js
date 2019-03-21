"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var _react = _interopRequireWildcard(require("react"));

var _reactTable = _interopRequireDefault(require("react-table"));

require("./DrillDownTable.css");

var _constants = require("./helpers/constants");

var _DropDownCell = _interopRequireWildcard(require("./helpers/DropDownCell"));

var _WithHeaders = _interopRequireWildcard(require("./WithHeaders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DrillDownTable(props) {
  var data = props.data,
      parentIdentifierField = props.parentIdentifierField,
      useDrillDownTrProps = props.useDrillDownTrProps;
  var columns = (0, _WithHeaders.getColumns)(props);

  var _useState = (0, _react.useState)(props.rootParentId),
      _useState2 = _slicedToArray(_useState, 2),
      currentParentId = _useState2[0],
      setCurrentParentId = _useState2[1];

  var _useState3 = (0, _react.useState)(props.data),
      _useState4 = _slicedToArray(_useState3, 1),
      originalData = _useState4[0];

  var _useState5 = (0, _react.useState)(data && parentIdentifierField ? data.map(function (el) {
    return el[parentIdentifierField];
  }) : []),
      _useState6 = _slicedToArray(_useState5, 1),
      parentNodes = _useState6[0];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      previousParentId = _useState8[0],
      setPreviousParentId = _useState8[1];

  (0, _react.useEffect)(function () {
    if (props.rootParentId !== currentParentId) {
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

  function hasChildren(row) {
    var identifierField = props.identifierField;

    if (identifierField && parentNodes && parentNodes.includes(row.original[identifierField])) {
      return true;
    }

    return false;
  }

  var drillDownTrProps = function drillDownTrProps(row, instance) {
    var getTrProps = props.getTrProps;

    if (getTrProps !== undefined) {
      return getTrProps;
    }

    return {
      onClick: function onClick() {
        if (props.identifierField && props.parentIdentifierField) {
          if (hasChildren(instance)) {
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
        CellComponent = props.CellComponent;

    if (el.hasOwnProperty('columns') && el.columns && el.columns.length > 0) {
      var newColumns = el.columns.map(mutateColumns);
      el.columns = newColumns;
    }

    if (el.accessor === linkerField) {
      el.Cell = function (cell) {
        if (CellComponent !== undefined) {
          var cellProps = {
            cellValue: cell.value,
            hasChildren: hasChildren(cell)
          };
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
  identifierField: _constants.ID,
  linkerField: _constants.ID,
  parentIdentifierField: _constants.PARENT_ID,
  rootParentId: _constants.ROOT_PARENT_ID,
  useDrillDownTrProps: true
};
var _default = DrillDownTable;
exports.default = _default;