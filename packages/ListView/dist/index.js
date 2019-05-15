"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderHeadersFunc = renderHeadersFunc;
exports.renderRowsFunc = renderRowsFunc;
exports.default = void 0;

var _elementMap = _interopRequireDefault(require("@onaio/element-map"));

var _react = _interopRequireDefault(require("react"));

function renderHeadersFunc(items, theadClass, thClass, trClass) {
  if (items) {
    return _react.default.createElement("thead", {
      className: theadClass ? theadClass : ''
    }, _react.default.createElement("tr", {
      className: trClass ? trClass : ''
    }, _react.default.createElement(_elementMap.default, {
      items: items,
      HTMLTag: "th",
      className: thClass ? thClass : ''
    })));
  } else {
    return null;
  }
}

function renderRowsFunc(rowData, tbClass, tdClass, trClass) {
  var rows = rowData.map(function (items, itemKey) {
    return _react.default.createElement("tr", {
      key: itemKey,
      className: trClass ? trClass : ''
    }, _react.default.createElement(_elementMap.default, {
      items: items,
      HTMLTag: "td",
      className: tdClass ? tdClass : ''
    }));
  });
  return _react.default.createElement("tbody", {
    className: tbClass ? tbClass : ''
  }, rows);
}

var defaultListViewProps = {
  renderHeaders: renderHeadersFunc,
  renderRows: renderRowsFunc,
  tableClass: 'listview',
  tbodyClass: 'listview-tbody',
  tdClass: 'listview-td',
  thClass: 'listview-th',
  theadClass: 'listview-thead',
  trClass: 'listview-tr'
};

var ListView = function ListView(props) {
  var data = props.data,
      headerItems = props.headerItems,
      renderHeaders = props.renderHeaders,
      renderRows = props.renderRows,
      tableClass = props.tableClass,
      tdClass = props.tdClass,
      tbodyClass = props.tbodyClass,
      theadClass = props.theadClass,
      thClass = props.thClass,
      trClass = props.trClass;
  return _react.default.createElement("table", {
    className: tableClass
  }, renderHeaders && renderHeaders(headerItems, theadClass, tdClass, trClass), renderRows && renderRows(data, tbodyClass, thClass, trClass));
};

ListView.defaultProps = defaultListViewProps;
var _default = ListView;
exports.default = _default;