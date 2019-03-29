"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CARET = exports.CARET_CSS_CLASS = exports.CLICKABLE_CSS_CLASS = exports.LINKER_ITEM_CSS_CLASS = exports.ROOT_PARENT_ID = exports.PARENT_ID = exports.ID = void 0;

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

var CARET = _react.default.createElement("span", {
  className: CARET_CSS_CLASS
}, "\xA0\u25BC");

exports.CARET = CARET;