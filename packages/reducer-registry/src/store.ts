/** Store module */
import { combineReducers, createStore, Reducer } from 'redux';
import reducerRegistry, { Registry } from './index';

/** Declare type for initial state */
interface State {
  [key: string]: any;
}

/** Combine all reducers, but preserve initial state for not-yet-loaded
 * reducers
 */
export function combine(reducers: Registry, initialState: State = {}) {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = initialState[item]): Reducer => state;
    }
  });
  return combineReducers(reducers);
}

/** Create store */
export function getStore(reducers: Registry, initialState: State = {}) {
  if (Object.keys(reducers).length > 0) {
    return createStore(combine(reducers, initialState));
  }
  return createStore(() => initialState);
}

const store = getStore(reducerRegistry.getReducers());

/** Add reducer to store when it is registered */
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

export default store;
