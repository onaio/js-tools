import reducerRegistry, { combine } from '@onaio/redux-reducer-registry';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, Reducer } from 'redux';
import thunk from 'redux-thunk';

/** Add redux dev tools to Window */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

/** Create the browser history object */
export const history = createBrowserHistory();

/** Declare type for reducer Registry */
export interface Registry {
  [key: string]: Reducer;
}

/** Function to create the connected Redux Registry store
 * @param {Registry} reducers - The default reducers to include in the store.
 */
export function getConnectedStore(reducers: Registry) {
  /** Register each of the initial reducers */
  Object.keys(reducers).forEach(reducerName => {
    reducerRegistry.register(reducerName, reducers[reducerName]);
  });

  /** Combine reducers */
  const reducer = combine(reducerRegistry.getReducers());

  /** Add redux dev tools to enhancers */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  /** Create the store */
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))));
}

/** Router reducer */
export const connectReducer = connectRouter(history);

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
