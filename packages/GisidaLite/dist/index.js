"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoizedGisidaLite = exports.GisidaLite = exports.arePropsEqual = exports.gisidaLiteDefaultProps = exports.ReactMapboxGlProps = void 0;

var _lodash = require("lodash");

require("mapbox-gl/dist/mapbox-gl.css");

var _react = _interopRequireWildcard(require("react"));

var _reactMapboxGl = _interopRequireWildcard(require("react-mapbox-gl"));

var _constants = require("./constants");

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
  reactMapboxGlConfigs: ReactMapboxGlProps
};
exports.gisidaLiteDefaultProps = gisidaLiteDefaultProps;

var GisidaLite = function GisidaLite(props) {
  var mapConfigs = props.mapConfigs,
      reactMapboxGlConfigs = props.reactMapboxGlConfigs,
      mapComponents = props.mapComponents,
      layers = props.layers;
  var Mapbox = (0, _react.useMemo)(function () {
    return (0, _reactMapboxGl["default"])(reactMapboxGlConfigs);
  }, [reactMapboxGlConfigs]);
  return _react["default"].createElement(Mapbox, mapConfigs, _react["default"].createElement(_react["default"].Fragment, null, layers, mapComponents));
};

exports.GisidaLite = GisidaLite;
GisidaLite.defaultProps = gisidaLiteDefaultProps;

var arePropsEqual = function arePropsEqual(prevProps, nextProps) {
  return (0, _lodash.isEqual)(prevProps.layers, nextProps.layers);
};

exports.arePropsEqual = arePropsEqual;

var MemoizedGisidaLite = _react["default"].memo(GisidaLite, arePropsEqual);

exports.MemoizedGisidaLite = MemoizedGisidaLite;