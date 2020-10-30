"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ellipsis = exports.defaultEllipsisProps = exports.StyledEllipsis = exports.ellipsis3 = exports.ellipsis2 = exports.ellipsis1 = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _commons = require("../commons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  position: relative;\n  width: ", ";\n  height: ", ";\n\n  div {\n    position: absolute;\n    top: 33px;\n    width: ", ";\n    height: ", ";\n    border-radius: 50%;\n    background: ", ";\n    animation-timing-function: cubic-bezier(0, 1, 1, 0);\n  }\n\n  div:nth-child(1){\n    left: 8px;\n    animation: ", " ", " infinite;\n  }\n\n  div:nth-child(2){\n    left: 8px;\n    animation: ", " ", " infinite;\n  }\n\n  div:nth-child(3){\n    left: ", ";\n    animation: ", " ", " infinite;\n  }\n\n  div:nth-child(4){\n    left: ", ";\n    animation: ", " ", " infinite;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n0% {\n  transform: scale(1);\n}\n100% {\n  transform: scale(0);\n}"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n0% {\n  transform: translate(0, 0);\n}\n100% {\n  transform: translate(", "px, 0);\n}"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n0% {\n  transform: scale(0);\n}\n100% {\n  transform: scale(1);\n}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultAnimationDuration = 0.6;
var ellipsis1 = (0, _styledComponents.keyframes)(_templateObject());
exports.ellipsis1 = ellipsis1;

var ellipsis2 = function ellipsis2(props) {
  return (0, _styledComponents.keyframes)(_templateObject2(), props.scaleSizeBy * 24);
};

exports.ellipsis2 = ellipsis2;
var ellipsis3 = (0, _styledComponents.keyframes)(_templateObject3());
exports.ellipsis3 = ellipsis3;

var StyledEllipsis = _styledComponents["default"].div(_templateObject4(), function (props) {
  return "".concat(props.scaleSizeBy * 80, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 80, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 13, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 13, "px");
}, function (props) {
  return props.color;
}, ellipsis1, function (props) {
  return (0, _commons.getAnimationDuration)(props, defaultAnimationDuration);
}, function (props) {
  return ellipsis2(props);
}, function (props) {
  return (0, _commons.getAnimationDuration)(props, defaultAnimationDuration);
}, function (props) {
  return "".concat(props.scaleSizeBy * 32, "px");
}, function (props) {
  return ellipsis2(props);
}, function (props) {
  return (0, _commons.getAnimationDuration)(props, defaultAnimationDuration);
}, function (props) {
  return "".concat(props.scaleSizeBy * 56, "px");
}, ellipsis3, function (props) {
  return (0, _commons.getAnimationDuration)(props, defaultAnimationDuration);
});

exports.StyledEllipsis = StyledEllipsis;

var defaultEllipsisProps = _objectSpread({}, _commons.commonDefaultProps);

exports.defaultEllipsisProps = defaultEllipsisProps;

var Ellipsis = function Ellipsis(props) {
  return _react["default"].createElement(StyledEllipsis, props, _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null));
};

exports.Ellipsis = Ellipsis;
Ellipsis.defaultProps = defaultEllipsisProps;