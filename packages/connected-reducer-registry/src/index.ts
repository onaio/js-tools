import { createRouterMiddleware, createRouterReducer } from '@lagunovsky/redux-react-router';
import reducerRegistry, { combine, Registry } from '@onaio/redux-reducer-registry';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

/** Add redux dev tools to Window */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

/** Declare type for initial state */
interface State {
  [key: string]: any;
}

/** Create the browser history object */
export const history = createBrowserHistory();

/** Function to create the connected Redux Registry store
 * @param {Registry} reducers - The default reducers to include in the store.
 * @param {State} initialState - The initial state.
 */
export function getConnectedStore(reducers: Registry, initialState: State = {}) {
  /** Register each of the initial reducers */
  Object.keys(reducers).forEach(reducerName => {
    reducerRegistry.register(reducerName, reducers[reducerName]);
  });

  /** Combine reducers */
  const reducer = combine(reducerRegistry.getReducers(), initialState);

  /** Add redux dev tools to enhancers */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  /** Create the store */
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, createRouterMiddleware(history)))
  );
}

/** Router reducer */
export const connectReducer = createRouterReducer(history);

/** Initial reducers in the reducer registry */
const defaultReducers: Registry = {
  router: connectReducer as any /** Dirty hack because connectRouter LocationChangeAction does not extend Redux.AnyAction */
};

/** The initial connected store */
const store = getConnectedStore(defaultReducers);

/** Set listener to add reducers to store when registered */
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

export default store;
