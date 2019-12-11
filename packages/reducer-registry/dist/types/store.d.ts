/** Store module */
import { Reducer } from 'redux';
import { Registry } from './registry';
/** Declare type for initial state */
interface State {
  [key: string]: any;
}
/** Combine all reducers, but preserve any initial state
 */
export declare function combine(
  reducers: Registry,
  initialState?: State
): Reducer<
  {
    [x: string]: any;
  },
  import('redux').AnyAction
>;
/** Function that returns a Redux store given a list of Reducers and initial
 * state
 */
export declare function getStore(
  reducers: Registry,
  initialState?: State
): import('redux').Store<
  {
    [x: string]: any;
  },
  import('redux').AnyAction
>;
/** Ready-to-use default store made from an empty Reducer registry */
declare const store: import('redux').Store<
  {
    [x: string]: any;
  },
  import('redux').AnyAction
>;
export default store;
