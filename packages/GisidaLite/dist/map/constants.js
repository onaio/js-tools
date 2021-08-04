"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GEOJSON_DATA = exports.DEFAULT_CONTAINER_STYLES = exports.DEFAULT_STYLES = exports.DEFAULT_ATTRIBUTION = exports.DEFAULT_ACCESS_TOKEN = void 0;
var DEFAULT_ACCESS_TOKEN = 'pk.eyJ1Ijoib25hIiwiYSI6IlVYbkdyclkifQ.0Bz-QOOXZZK01dq4MuMImQ';
exports.DEFAULT_ACCESS_TOKEN = DEFAULT_ACCESS_TOKEN;
var DEFAULT_ATTRIBUTION = '&copy; ONA Engineering';
exports.DEFAULT_ATTRIBUTION = DEFAULT_ATTRIBUTION;
var DEFAULT_STYLES = 'mapbox://styles/mapbox/streets-v9';
exports.DEFAULT_STYLES = DEFAULT_STYLES;
var DEFAULT_CONTAINER_STYLES = {
  height: '100vh',
  width: '100vw'
};
exports.DEFAULT_CONTAINER_STYLES = DEFAULT_CONTAINER_STYLES;
var GEOJSON_DATA = {
  geometry: {
    coordinates: [0, 0],
    type: 'Point'
  },
  type: 'Feature'
};
exports.GEOJSON_DATA = GEOJSON_DATA;