"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasChildrenFunc = hasChildrenFunc;
exports.Table = Table;
exports.defaultTableProps = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactTable = require("react-table");

var _constants = require("../helpers/constants");

var _HelperComponents = require("./HelperComponents");

var _SortIcon = require("./SortIcon");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function hasChildrenFunc(cellObject, parentIdList) {
  var idField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.ID;
  return parentIdList.includes(cellObject.row.original[idField]);
}

var defaultTableProps = {
  data: [],
  hasChildren: hasChildrenFunc,
  identifierField: _constants.ID,
  linkerField: _constants.ID,
  paginate: true,
  parentIdentifierField: _constants.PARENT_ID,
  renderNullDataComponent: _HelperComponents.NullDataComponent,
  resize: true,
  rootParentId: _constants.ROOT_PARENT_ID,
  useDrillDown: true
};
exports.defaultTableProps = defaultTableProps;

var useDefaultColumn = function useDefaultColumn() {
  return _react["default"].useMemo(function () {
    return {
      maxWidth: 200,
      minWidth: 50,
      width: 150
    };
  }, []);
};

function Table(props) {
  var columns = props.columns,
      data = props.data,
      fetchData = props.fetchData,
      identifierField = props.identifierField;

  var skipPageResetRef = _react["default"].useRef();

  var _React$useState = _react["default"].useState(_constants.DEFAULT_ROW_HEIGHT),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      rHeight = _React$useState2[0],
      setRowHeight = _React$useState2[1];

  var _useState = (0, _react.useState)(props.rootParentId),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      currentParentId = _useState2[0],
      setCurrentParentId = _useState2[1];

  var tableProps = (0, _reactTable.useTable)({
    autoResetPage: !skipPageResetRef.current,
    autoResetSortBy: !skipPageResetRef.current,
    columns: columns,
    data: data,
    defaultColumn: useDefaultColumn(),
    initialState: {
      pageIndex: 0
    }
  }, _reactTable.useSortBy, _reactTable.usePagination, _reactTable.useResizeColumns, _reactTable.useFlexLayout);

  _react["default"].useEffect(function () {
    fetchData({
      skipPageResetRef: skipPageResetRef,
      currentParentId: currentParentId
    });
    skipPageResetRef.current = false;
  }, [fetchData, currentParentId]);

  var getTableProps = tableProps.getTableProps,
      getTableBodyProps = tableProps.getTableBodyProps,
      headerGroups = tableProps.headerGroups,
      prepareRow = tableProps.prepareRow,
      page = tableProps.page,
      rows = tableProps.rows;
  var dataToRender = props.paginate ? page : rows;

  var getCustomCellProps = function getCustomCellProps(cell) {
    return [{
      onClick: function onClick(e) {
        e.stopPropagation();

        if (!(props.useDrillDown && cell.column.id === props.linkerField)) {
          return;
        }

        if (props.identifierField && props.parentIdentifierField) {
          if (props.hasChildren && hasChildrenFunc(cell, props.parentNodes, props.identifierField)) {
            var newParentId = cell.row.original[identifierField];
            setCurrentParentId(newParentId);
          }
        }
      },
      style: {
        minHeight: rHeight,
        lineHeight: rHeight
      }
    }];
  };

  return _react["default"].createElement("div", {
    className: "table-container mb-3"
  }, props.renderInTopFilterBar && props.renderInTopFilterBar(_objectSpread({}, tableProps, {
    setRowHeight: setRowHeight
  })), _react["default"].createElement("div", (0, _extends2["default"])({}, getTableProps(), {
    className: "table div-table"
  }), _react["default"].createElement("div", {
    className: "thead"
  }, headerGroups.map(function (headerGroup) {
    return _react["default"].createElement("div", (0, _extends2["default"])({}, headerGroup.getHeaderGroupProps(), {
      className: "tr"
    }), headerGroup.headers.map(function (c, index) {
      var column = c;
      return _react["default"].createElement("div", (0, _extends2["default"])({}, column.getHeaderProps(column.getSortByToggleProps([])), {
        key: "thead-th-".concat(index),
        className: "th"
      }), column.render('Header'), column.canSort && _react["default"].createElement(_SortIcon.SortIcon, {
        isSorted: column.isSorted,
        isSortedDesc: column.isSortedDesc
      }), props.resize && _react["default"].createElement("div", (0, _extends2["default"])({}, column.getResizerProps([{
        onClick: function onClick(ev) {
          ev.stopPropagation();
          ev.preventDefault();
        }
      }]), {
        className: "resizer ".concat(column.isResizing ? 'isResizing' : '')
      })));
    }));
  })), _react["default"].createElement("div", (0, _extends2["default"])({}, getTableBodyProps(), {
    className: "tbody"
  }), dataToRender.map(function (row, idx) {
    prepareRow(row);
    return _react["default"].createElement("div", (0, _extends2["default"])({}, row.getRowProps(), {
      key: "tbody-tr-".concat(idx),
      className: "tr"
    }), row.cells.map(function (cell, i) {
      return _react["default"].createElement("div", (0, _extends2["default"])({}, cell.getCellProps(props.getTdProps ? props.getTdProps(cell) : getCustomCellProps(cell)), {
        key: "td-".concat(i),
        className: "td"
      }), cell.render('Cell'));
    }));
  }))), data.length === 0 && props.renderNullDataComponent(), props.renderInBottomFilterBar && props.renderInBottomFilterBar(_objectSpread({}, tableProps, {
    setRowHeight: setRowHeight
  })));
}

Table.defaultProps = defaultTableProps;