"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDimensions = exports.initGoogleAnalytics = exports.defaultInitializeOptions = exports.trackPage = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var trackPage = function trackPage(page) {
  _reactGa["default"].pageview(page);
};

exports.trackPage = trackPage;
var defaultInitializeOptions = {
  testMode: false
};
exports.defaultInitializeOptions = defaultInitializeOptions;
var initGoogleAnalytics = (0, _memoizeOne["default"])(function (trackingCode) {
  var initializeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultInitializeOptions;
  var isGAEnabled = !!(trackingCode && trackingCode.length);

  if (isGAEnabled) {
    _reactGa["default"].initialize(trackingCode, initializeOptions);
  }

  return isGAEnabled;
});
exports.initGoogleAnalytics = initGoogleAnalytics;
var setDimensions = (0, _memoizeOne["default"])(function (dimensions) {
  _reactGa["default"].set(dimensions);
});
exports.setDimensions = setDimensions;