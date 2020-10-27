"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = exports.defaultGridProps = exports.StyledGrid = exports.gridAnimation = exports.defaultAnimationDuration = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _commons = require("../commons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  position: relative;\n  width: ", ";\n  height: ", ";\n\n\n  div {\n    position: absolute;\n    width: ", ";\n    height: ", ";\n    border-radius: 50%;\n    background: ", ";\n    animation: ", " ", " linear infinite\n  }\n\n  div:nth-Child(1) {\n    top: 8px;\n    left: 8px;\n    animation-delay: 0s;\n  }\n\n  div:nth-Child(2) {\n    top: 8px;\n    left: ", ";\n    animation-delay: -0.4s;\n  }\n\n  div:nth-Child(3) {\n    top: 8px;\n    left: ", ";\n    animation-delay: -0.8s;\n  }\n\n  div:nth-Child(4) {\n    top: ", ";\n    left: 8px;\n    animation-delay: -0.4s;\n  }\n\n  div:nth-Child(5) {\n    top: ", ";\n    left: ", ";\n    animation-delay: -0.8s;\n  }\n\n  div:nth-Child(6) {\n    top: ", ";\n    left: ", ";\n    animation-delay: -1.2s;\n  }\n\n  div:nth-Child(7) {\n    top: ", ";\n    left: 8px;\n    animation-delay: -0.8s;\n  }\n  div:nth-Child(8) {\n    top: ", ";\n    left: ", ";\n    animation-delay: -1.2s;\n  }\n\n  div:nth-Child(9) {\n    top: ", ";\n    left: ", ";\n    animation-delay: -1.6s;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n0%, 100% {\n  opacity: 1;\n}\n50% {\n  opacity: 0.5;\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultAnimationDuration = 1.2;
exports.defaultAnimationDuration = defaultAnimationDuration;
var gridAnimation = (0, _styledComponents.keyframes)(_templateObject());
exports.gridAnimation = gridAnimation;

var StyledGrid = _styledComponents["default"].div(_templateObject2(), function (props) {
  return "".concat(props.scaleSizeBy * 80, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 80, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 16, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 16, "px");
}, function (props) {
  return props.color;
}, gridAnimation, function (props) {
  return (0, _commons.getAnimationDuration)(props, defaultAnimationDuration);
}, function (props) {
  return "".concat(props.scaleSizeBy * 32, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 56, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 32, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 32, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 32, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 32, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 56, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 56, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 56, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 32, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 56, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 56, "px");
});

exports.StyledGrid = StyledGrid;

var defaultGridProps = _objectSpread({}, _commons.commonDefaultProps);

exports.defaultGridProps = defaultGridProps;

var Grid = function Grid(props) {
  return _react["default"].createElement(StyledGrid, props, _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null));
};

exports.Grid = Grid;
Grid.defaultProps = defaultGridProps;