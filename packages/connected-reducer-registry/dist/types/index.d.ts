import { Registry } from '@onaio/redux-reducer-registry';
import { compose } from 'redux';
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
export declare const history: import('history').History<any>;
/** Function to create the connected Redux Registry store
 * @param {Registry} reducers - The default reducers to include in the store.
 * @param {State} initialState - The initial state.
 */
export declare function getConnectedStore(
  reducers: Registry,
  initialState?: State
): import('redux').Store<
  {
    [x: string]: any;
  },
  import('redux').AnyAction
> & {
  dispatch: {};
};
/** Router reducer */
export declare const connectReducer: import('redux').Reducer<
  import('connected-react-router').RouterState,
  import('connected-react-router').LocationChangeAction
>;
/** The initial connected store */
declare const store: import('redux').Store<
  {
    [x: string]: any;
  },
  import('redux').AnyAction
> & {
  dispatch: {};
};
export default store;
