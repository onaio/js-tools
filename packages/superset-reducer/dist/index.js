"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;
exports.isAuthorized = isAuthorized;
exports.resetSuperset = exports.authorizeSuperset = exports.RESET = exports.AUTHORIZE = exports.reducerName = void 0;

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

var reducerName = 'superset';
exports.reducerName = reducerName;
var initialState = (0, _seamlessImmutable["default"])({
  authorized: null
});

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case AUTHORIZE:
      return state.merge({
        authorized: action.authorized
      });

    case RESET:
      return state.merge({
        authorized: null
      });

    default:
      return state;
  }
}

var AUTHORIZE = 'reveal/reducer/superset/AUTHORIZE';
exports.AUTHORIZE = AUTHORIZE;
var RESET = 'reveal/reducer/superset/RESET';
exports.RESET = RESET;

var authorizeSuperset = function authorizeSuperset(authorized) {
  return {
    authorized: authorized,
    type: AUTHORIZE
  };
};

exports.authorizeSuperset = authorizeSuperset;

var resetSuperset = function resetSuperset() {
  return {
    type: RESET
  };
};

exports.resetSuperset = resetSuperset;

function isAuthorized(state) {
  return state[reducerName].authorized;
}