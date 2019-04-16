/** Redux reducer registry module */
import { Reducer } from 'redux';

/** Declare type for function that takes any arguments and returns nothing */
type EmitChangeFunction = (reducers: Registry) => void;

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
export class ReducerRegistry {
  private emitChange: EmitChangeFunction | null;
  private reducers: Registry;

  /** Constructor */
  constructor() {
    this.emitChange = null;
    this.reducers = {};
  }

  /** Get all registered reducers */
  public getReducers() {
    return { ...this.reducers };
  }

  /** Method to register a new reducer with the Reducer Registry
   * @param {string} name - the name of the reducer
   * @param {Reducer} reducer - the reducer object
   */
  public register(name: string, reducer: Reducer) {
    this.reducers = { ...this.reducers, [name]: reducer };
    if (this.emitChange !== null) {
      this.emitChange(this.getReducers());
    }
  }

  /** Method to set the change listener
   * @param {EmitChangeFunction} listener - the callback function to be called
   * after a reducer has been registered
   */
  public setChangeListener(listener: EmitChangeFunction) {
    this.emitChange = listener;
  }
}

/**
 * The reducer registry enables Redux reducers to be added to the store’s
 * reducer after the store has been created. This allows Redux modules to be
 * loaded on-demand, without requiring all Redux modules to be bundled in the
 * main chunk for the store to correctly initialize. *
 */
const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
