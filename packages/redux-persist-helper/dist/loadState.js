"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var loadState = function loadState(reducerName) {
  try {
    var serializedState = localStorage.getItem(reducerName);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

var _default = loadState;
exports["default"] = _default;