"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleRotate = exports.defaultCircleRotate = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _commons = require("../commons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    display: inline-block;\n    transform: translateZ(1px);\n\n    div{\n        display: inline-block;\n        width: ", ";\n        height: ", ";\n        margin: 8px;\n        border-radius: 50%;\n        background: ", ";\n        animation: ", " ", " cubic-bezier(0, 0.2, 0.8, 1) infinite;\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n0%, 100% {\n    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);\n  }\n  0% {\n    transform: rotateY(0deg);\n  }\n  50% {\n    transform: rotateY(1800deg);\n    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);\n  }\n  100% {\n    transform: rotateY(3600deg);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultAnimationDuration = 1.2;
var rotation = (0, _styledComponents.keyframes)(_templateObject());

var StyledCircleRotate = _styledComponents["default"].div(_templateObject2(), function (props) {
  return "".concat(props.scaleSizeBy * 64, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 64, "px");
}, function (props) {
  return props.color;
}, rotation, function (props) {
  return (0, _commons.getAnimationDuration)(props, defaultAnimationDuration);
});

var defaultCircleRotate = _objectSpread({}, _commons.commonDefaultProps);

exports.defaultCircleRotate = defaultCircleRotate;

var CircleRotate = function CircleRotate(props) {
  return _react["default"].createElement(StyledCircleRotate, props, _react["default"].createElement("div", null));
};

exports.CircleRotate = CircleRotate;
CircleRotate.defaultProps = defaultCircleRotate;