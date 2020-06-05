"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAGE_SIZE_CATEGORIES = exports.LOADING = exports.CUSTOMIZE_COLUMNS_FILTER_MESSAGE = exports.CUSTOMIZE_COLUMNS = exports.ROWS_TO_DISPLAY = exports.PREVIOUS = exports.PAGE = exports.OF = exports.NEXT = exports.NO_DATA_FOUND = exports.DEFAULT_ROW_HEIGHT = exports.CARET_SPAN = exports.CARET_CSS_CLASS = exports.CLICKABLE_CSS_CLASS = exports.LINKER_ITEM_CSS_CLASS = exports.ROOT_PARENT_ID = exports.PARENT_ID = exports.ID = void 0;

var _react = _interopRequireDefault(require("react"));

var ID = 'id';
exports.ID = ID;
var PARENT_ID = 'parent_id';
exports.PARENT_ID = PARENT_ID;
var ROOT_PARENT_ID = null;
exports.ROOT_PARENT_ID = ROOT_PARENT_ID;
var LINKER_ITEM_CSS_CLASS = 'dd-linker-item';
exports.LINKER_ITEM_CSS_CLASS = LINKER_ITEM_CSS_CLASS;
var CLICKABLE_CSS_CLASS = 'dd-linker-item dd-clickable';
exports.CLICKABLE_CSS_CLASS = CLICKABLE_CSS_CLASS;
var CARET_CSS_CLASS = 'dd-caret';
exports.CARET_CSS_CLASS = CARET_CSS_CLASS;

var CARET_SPAN = _react["default"].createElement("span", {
  className: CARET_CSS_CLASS
}, "\xA0\u25BC");

exports.CARET_SPAN = CARET_SPAN;
var DEFAULT_ROW_HEIGHT = '2em';
exports.DEFAULT_ROW_HEIGHT = DEFAULT_ROW_HEIGHT;
var NO_DATA_FOUND = 'No Data Found';
exports.NO_DATA_FOUND = NO_DATA_FOUND;
var NEXT = 'Next';
exports.NEXT = NEXT;
var OF = 'Of';
exports.OF = OF;
var PAGE = 'Page';
exports.PAGE = PAGE;
var PREVIOUS = 'Previous';
exports.PREVIOUS = PREVIOUS;
var ROWS_TO_DISPLAY = 'Rows to display';
exports.ROWS_TO_DISPLAY = ROWS_TO_DISPLAY;
var CUSTOMIZE_COLUMNS = 'Customize Columns';
exports.CUSTOMIZE_COLUMNS = CUSTOMIZE_COLUMNS;
var CUSTOMIZE_COLUMNS_FILTER_MESSAGE = 'Select the columns you want to display';
exports.CUSTOMIZE_COLUMNS_FILTER_MESSAGE = CUSTOMIZE_COLUMNS_FILTER_MESSAGE;
var LOADING = 'Loading';
exports.LOADING = LOADING;
var PAGE_SIZE_CATEGORIES = [10, 20, 30, 50];
exports.PAGE_SIZE_CATEGORIES = PAGE_SIZE_CATEGORIES;