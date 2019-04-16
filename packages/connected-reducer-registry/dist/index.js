"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnectedStore = getConnectedStore;
exports.default = exports.connectReducer = exports.history = void 0;

var _reduxReducerRegistry = _interopRequireWildcard(require("@onaio/redux-reducer-registry"));

var _connectedReactRouter = require("connected-react-router");

var _history = require("history");

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var history = (0, _history.createBrowserHistory)();
exports.history = history;

function getConnectedStore(reducers) {
  Object.keys(reducers).forEach(function (reducerName) {
    _reduxReducerRegistry.default.register(reducerName, reducers[reducerName]);
  });
  var reducer = (0, _reduxReducerRegistry.combine)(_reduxReducerRegistry.default.getReducers());
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  return (0, _redux.createStore)(reducer, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk.default, (0, _connectedReactRouter.routerMiddleware)(history))));
}

var connectReducer = (0, _connectedReactRouter.connectRouter)(history);
exports.connectReducer = connectReducer;
var defaultReducers = {
  router: connectReducer
};
var store = getConnectedStore(defaultReducers);

_reduxReducerRegistry.default.setChangeListener(function (reducers) {
  store.replaceReducer((0, _reduxReducerRegistry.combine)(reducers));
});

var _default = store;
exports.default = _default;