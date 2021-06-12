"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var saveState = function saveState(state, isLoggedIn, reducerName) {
  try {
    var serializedState = JSON.stringify(state);

    if (isLoggedIn) {
      localStorage.setItem(reducerName, serializedState);
    } else {
      localStorage.removeItem(reducerName);
    }
  } catch (e) {}
};

var _default = saveState;
exports["default"] = _default;