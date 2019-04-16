"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;
exports.getStore = getStore;
exports.default = void 0;

var _redux = require("redux");

var _registry = _interopRequireDefault(require("./registry"));

function combine(reducers) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(function (item) {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState[item];
        return state;
      };
    }
  });
  return (0, _redux.combineReducers)(reducers);
}

function getStore(reducers) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (Object.keys(reducers).length > 0) {
    return (0, _redux.createStore)(combine(reducers, initialState));
  }

  return (0, _redux.createStore)(function () {
    return initialState;
  });
}

var store = getStore(_registry.default.getReducers());

_registry.default.setChangeListener(function (reducers) {
  store.replaceReducer(combine(reducers));
});

var _default = store;
exports.default = _default;