"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnimationDuration = exports.commonDefaultProps = void 0;
var commonDefaultProps = {
  animationSpeed: 2.4,
  color: 'tomato',
  scaleSizeBy: 1,
  scaleSpeedBy: 1
};
exports.commonDefaultProps = commonDefaultProps;

var getAnimationDuration = function getAnimationDuration(props) {
  var animationDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : commonDefaultProps.animationSpeed;
  return "".concat(1 / props.scaleSpeedBy * animationDuration, "s");
};

exports.getAnimationDuration = getAnimationDuration;