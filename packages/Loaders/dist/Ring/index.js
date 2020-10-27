"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ring = exports.StyledRing = exports.ringAnimation = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _commons = require("../commons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  position: relative;\n  width: ", ";\n  height: ", ";\n\n  div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: ", ";\n  height: ", ";\n    margin: 8px;\n    border: 8px solid ", ";\n    border-radius: 50%;\n    border-color: ", " transparent transparent transparent;\n    animation: ", " ", " cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  }\n\n  div:nth-child(1){\n    animation-delay: ", ";\n  }\n\n  div:nth-child(2){\n    animation-delay: ", ";\n  }\n\n  div: nth-child(3){\n    animation-delay: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultAnimationDuration = 1.2;
var ringAnimation = (0, _styledComponents.keyframes)(_templateObject());
exports.ringAnimation = ringAnimation;

var StyledRing = _styledComponents["default"].div(_templateObject2(), function (props) {
  return "".concat(props.scaleSizeBy * 80, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 80, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 64, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 64, "px");
}, function (props) {
  return props.color;
}, function (props) {
  return props.color;
}, ringAnimation, function (props) {
  return (0, _commons.getAnimationDuration)(props, defaultAnimationDuration);
}, function (props) {
  return (0, _commons.getAnimationDuration)(props, -0.45);
}, function (props) {
  return (0, _commons.getAnimationDuration)(props, -0.3);
}, function (props) {
  return (0, _commons.getAnimationDuration)(props, -0.15);
});

exports.StyledRing = StyledRing;

var defaultRingProps = _objectSpread({}, _commons.commonDefaultProps);

var Ring = function Ring(props) {
  return _react["default"].createElement(StyledRing, props, _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null));
};

exports.Ring = Ring;
Ring.defaultProps = defaultRingProps;