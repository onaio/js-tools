"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Facebook = exports.defaultFaceBookProps = exports.StyledFacebook = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _commons = require("../commons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  position: relative;\n  width: ", ";\n  height: ", ";\n\n  div {\n    display: inline-block;\n    position: absolute;\n    left: 8px;\n    width: ", ";\n    background: ", ";\n    animation: ", " ", " cubic-bezier(0, 0.5, 0.5, 1) infinite;\n  }\n\n  div:nth-child(1) {\n    left:  ", ";\n    animation-delay: -0.24s;\n  }\n  \n  div:nth-child(2) {\n    left:  ", ";\n    animation-delay: -0.12s;\n  }\n  \n  div:nth-child(3) {\n    left:  ", ";\n    animation-delay: 0;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n0% {\n  top: ", ";\n  height: ", ";\n}\n50%, 100% {\n  top: ", ";\n  height: ", ";\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultAnimationDuration = 1.2;

var animation = function animation(props) {
  return (0, _styledComponents.keyframes)(_templateObject(), "".concat(props.scaleSizeBy * 8, "px"), "".concat(props.scaleSizeBy * 64, "px"), "".concat(props.scaleSizeBy * 24, "px"), "".concat(props.scaleSizeBy * 32, "px"));
};

var StyledFacebook = _styledComponents["default"].div(_templateObject2(), function (props) {
  return "".concat(props.scaleSizeBy * 80, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 80, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 16, "px");
}, function (props) {
  return props.color;
}, animation, function (props) {
  return (0, _commons.getAnimationDuration)(props, defaultAnimationDuration);
}, function (props) {
  return "".concat(props.scaleSizeBy * 8, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 32, "px");
}, function (props) {
  return "".concat(props.scaleSizeBy * 56, "px");
});

exports.StyledFacebook = StyledFacebook;

var defaultFaceBookProps = _objectSpread({}, _commons.commonDefaultProps);

exports.defaultFaceBookProps = defaultFaceBookProps;

var Facebook = function Facebook(props) {
  return _react["default"].createElement(StyledFacebook, props, _react["default"].createElement("div", null), _react["default"].createElement("div", null), _react["default"].createElement("div", null));
};

exports.Facebook = Facebook;
Facebook.defaultProps = defaultFaceBookProps;