/** Redux reducer registry module */
import { Reducer } from 'redux';
/** Declare type for function that takes any arguments and returns nothing */
declare type EmitChangeFunction = (reducers: Registry) => void;
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
  /** Constructor */
  constructor();
  /** Get all registered reducers */
  public getReducers(): {
    [x: string]: Reducer<any, import('redux').AnyAction>;
  };
  /** Method to register a new reducer with the Reducer Registry
   * @param {string} name - the name of the reducer
   * @param {Reducer} reducer - the reducer object
   */
  public register(name: string, reducer: Reducer): void;
  /** Method to set the change listener
   * @param {EmitChangeFunction} listener - the callback function to be called
   * after a reducer has been registered
   */
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
