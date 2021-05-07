"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoizedGisidaLite = exports.GisidaLite = exports.arePropsEqual = exports.gisidaLiteDefaultProps = exports.ReactMapboxGlProps = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

require("mapbox-gl/dist/mapbox-gl.css");

var _react = _interopRequireWildcard(require("react"));

var _reactMapboxGl = _interopRequireWildcard(require("react-mapbox-gl"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ReactMapboxGlProps = {
  accessToken: _constants.DEFAULT_ACCESS_TOKEN,
  attributionControl: true,
  customAttribution: _constants.DEFAULT_ATTRIBUTION,
  injectCSS: true
};
exports.ReactMapboxGlProps = ReactMapboxGlProps;
var mapProps = {
  containerStyle: _constants.DEFAULT_CONTAINER_STYLES,
  style: _constants.DEFAULT_STYLES
};
var gisidaLiteDefaultProps = {
  layers: [_react["default"].createElement(_reactMapboxGl.GeoJSONLayer, {
    key: "geoLayer",
    data: _constants.GEOJSON_DATA,
    symbolLayout: {
      'icon-image': 'triangle-15'
    }
  })],
  mapComponents: [_react["default"].createElement(_reactMapboxGl.ZoomControl, {
    key: "zoomCtrl",
    position: "top-right"
  }), _react["default"].createElement(_reactMapboxGl.ScaleControl, {
    key: "scalectrl",
    position: "bottom-left"
  })],
  mapConfigs: mapProps,
  reactMapboxGlMapFactoryUtilConfigs: ReactMapboxGlProps
};
exports.gisidaLiteDefaultProps = gisidaLiteDefaultProps;

var GisidaLite = function GisidaLite(props) {
  var mapConfigs = props.mapConfigs,
      reactMapboxGlMapFactoryUtilConfigs = props.reactMapboxGlMapFactoryUtilConfigs,
      mapComponents = props.mapComponents,
      layers = props.layers;

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      Map = _useState2[0],
      setMap = _useState2[1];

  (0, _react.useEffect)(function () {
    setMap((0, _reactMapboxGl["default"])(_objectSpread({}, reactMapboxGlMapFactoryUtilConfigs)));
  }, [reactMapboxGlMapFactoryUtilConfigs]);
  return Map ? _react["default"].createElement(Map, mapConfigs, _react["default"].createElement(Map, null, layers, mapComponents)) : null;
};

exports.GisidaLite = GisidaLite;
GisidaLite.defaultProps = gisidaLiteDefaultProps;

var arePropsEqual = function arePropsEqual(prevProps, nextProps) {
  return (0, _lodash.isEqual)(prevProps.layers, nextProps.layers);
};

exports.arePropsEqual = arePropsEqual;

var MemoizedGisidaLite = _react["default"].memo(GisidaLite, arePropsEqual);

exports.MemoizedGisidaLite = MemoizedGisidaLite;