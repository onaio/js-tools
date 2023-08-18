/** Store module */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, compose, createStore, Reducer } from 'redux';
import reducerRegistry, { Registry } from './registry';

/** Declare type for initial state */
interface State {
  [key: string]: any;
}

/** Add redux dev tools to Window */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

/** Combine all reducers, but preserve any initial state
 */
export function combine(reducers: Registry, initialState: State = {}) {
  Object.keys(initialState).forEach(item => {
    reducers[item] = (state = initialState[item]): Reducer => state;
  });
  return combineReducers(reducers);
}

/** Function that returns a Redux store given a list of Reducers and initial
 * state
 */
// export function getStore(reducers: Registry, initialState: State = {}) {
//   if (Object.keys(reducers).length > 0) {
//     return configureStore({
//       reducer: combine(reducers, initialState)
//     });
//   }
//   return configureStore({
//     reducer: (() => initialState)
//   });
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function getStore(reducers: Registry, initialState: State = {}) {
  if (Object.keys(reducers).length > 0) {
    return configureStore({
      reducer: combine(reducers, initialState)
    });
  }
  return configureStore({
    reducer: () => initialState
  });
}

// export function getStore(reducers: Registry, initialState: State = {}) {

//   return configureStore({
//     reducer: combine(reducers, initialState),
//     preloadedState: initialState,
//     devTools: process.env.NODE_ENV !== 'production',
//     enhancers: [composeEnhancers()],
//   });
// }

/** Ready-to-use default store made from an empty Reducer registry */
const store = getStore(reducerRegistry.getReducers());

/** Add reducer to store when it is registered */
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

export default store;
