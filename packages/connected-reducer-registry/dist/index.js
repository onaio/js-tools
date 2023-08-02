"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectReducer = void 0;
exports.getConnectedStore = getConnectedStore;
exports.history = void 0;
var _reduxReducerRegistry = _interopRequireWildcard(require("@onaio/redux-reducer-registry"));
var _reduxReactRouter = require("@lagunovsky/redux-react-router");
var _history = require("history");
var _redux = require("redux");
var _toolkit = require("@reduxjs/toolkit");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var history = (0, _history.createBrowserHistory)();
exports.history = history;
function getConnectedStore(reducers) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.keys(reducers).forEach(function (reducerName) {
    _reduxReducerRegistry["default"].register(reducerName, reducers[reducerName]);
  });
  var reducer = _reduxReducerRegistry["default"].getReducers();
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  var routerMiddleware = (0, _reduxReactRouter.createRouterMiddleware)(history);
  return (0, _toolkit.configureStore)({
    reducer: reducer,
    middleware: function middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().prepend(routerMiddleware);
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    enhancers: [composeEnhancers()]
  });
}
var connectReducer = (0, _reduxReactRouter.createRouterReducer)(history);
exports.connectReducer = connectReducer;
var defaultReducers = {
  router: connectReducer
};
var store = getConnectedStore(defaultReducers);
_reduxReducerRegistry["default"].setChangeListener(function (reducers) {
  store.replaceReducer((0, _reduxReducerRegistry.combine)(reducers));
});
var _default = store;
exports["default"] = _default;