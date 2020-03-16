"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RouteTracker", {
  enumerable: true,
  get: function get() {
    return _GARoute.RouteTracker;
  }
});
Object.defineProperty(exports, "WithGATracker", {
  enumerable: true,
  get: function get() {
    return _WithGATracker["default"];
  }
});
Object.defineProperty(exports, "InitializeOptions", {
  enumerable: true,
  get: function get() {
    return _reactGa.InitializeOptions;
  }
});
Object.defineProperty(exports, "initGoogleAnalytics", {
  enumerable: true,
  get: function get() {
    return _helpers.initGoogleAnalytics;
  }
});
Object.defineProperty(exports, "Dimensions", {
  enumerable: true,
  get: function get() {
    return _helpers.Dimensions;
  }
});
Object.defineProperty(exports, "setDimensions", {
  enumerable: true,
  get: function get() {
    return _helpers.setDimensions;
  }
});

var _GARoute = require("./components/GARoute");

var _WithGATracker = _interopRequireDefault(require("./components/WithGATracker"));

var _reactGa = require("react-ga");

var _helpers = require("./helpers");