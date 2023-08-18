"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;
exports["default"] = void 0;
exports.getStore = getStore;
var _toolkit = require("@reduxjs/toolkit");
var _redux = require("redux");
var _registry = _interopRequireDefault(require("./registry"));
function combine(reducers) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.keys(initialState).forEach(function (item) {
    reducers[item] = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState[item];
      return state;
    };
  });
  return (0, _redux.combineReducers)(reducers);
}
function getStore(reducers) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (Object.keys(reducers).length > 0) {
    return (0, _toolkit.configureStore)({
      reducer: combine(reducers, initialState)
    });
  }
  return (0, _toolkit.configureStore)({
    reducer: function reducer() {
      return initialState;
    }
  });
}
var store = getStore(_registry["default"].getReducers());
_registry["default"].setChangeListener(function (reducers) {
  store.replaceReducer((0, _redux.combineReducers)(reducers));
});
var _default = store;
exports["default"] = _default;