/** Redux reducer registry module */
import { Reducer } from 'redux';

/** Declare type for function that takes any arguments and returns nothing */
type EmitChangeFunction = (...args: any[]) => void;

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

  constructor() {
    this.emitChange = null;
    this.reducers = {};
  }

  public getReducers() {
    return { ...this.reducers };
  }

  public register(name: string, reducer: Reducer) {
    this.reducers = { ...this.reducers, [name]: reducer };
    if (this.emitChange !== null) {
      this.emitChange(this.getReducers());
    }
  }

  public setChangeListener(listener: EmitChangeFunction) {
    this.emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
