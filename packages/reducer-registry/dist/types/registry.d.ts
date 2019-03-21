/** Redux reducer registry module */
import { Reducer } from 'redux';
/** Declare type for function that takes any arguments and returns nothing */
declare type EmitChangeFunction = (...args: any[]) => void;
/** Declare type for reducer Registry */
export interface Registry {
  [key: string]: Reducer;
}
/**
 * The reducer registry enables Redux reducers to be added to the store’s
 * reducer after the store has been created. This allows Redux modules to be
 * loaded on-demand, without requiring all Redux modules to be bundled in the
 * main chunk for the store to correctly initialize.
 *
 * Inspired by: http://nicolasgallagher.com/redux-modules-and-code-splitting/
 *
 */
export declare class ReducerRegistry {
  private emitChange;
  private reducers;
  constructor();
  public getReducers(): {
    [x: string]: Reducer<any, import('redux').AnyAction>;
  };
  public register(name: string, reducer: Reducer): void;
  public setChangeListener(listener: EmitChangeFunction): void;
}
/**
 * The reducer registry enables Redux reducers to be added to the store’s
 * reducer after the store has been created. This allows Redux modules to be
 * loaded on-demand, without requiring all Redux modules to be bundled in the
 * main chunk for the store to correctly initialize. *
 */
declare const reducerRegistry: ReducerRegistry;
export default reducerRegistry;
