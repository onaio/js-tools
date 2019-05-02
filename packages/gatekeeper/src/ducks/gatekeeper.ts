import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

export const reducerName = 'gatekeeper';

/** Interface for Record action */
export interface RecordAction extends AnyAction {
  result: { [key: string]: any };
  success: boolean | null;
  type: typeof RECORD;
}

/** interface to describe GateKeeper state */
export interface GateKeeperState {
  result: { [key: string]: any } /** stores the result of the auth attempt */;
  success: boolean | null /** was it successful or not */;
}

/** Create type for GateKeeper reducer actions */
export type GateKeeperActionTypes = RecordAction | AnyAction;

/** immutable GateKeeper state */
export type ImmutableGateKeeperState = GateKeeperState &
  SeamlessImmutable.ImmutableObject<GateKeeperState>;

/** Initial state for GateKeeper */
export const initialState: ImmutableGateKeeperState = SeamlessImmutable({
  result: {},
  success: null
});

/** GateKeeper reducer function
 * @param {initialState} state - the initial state
 * @param {GateKeeperActionTypes} action - the action
 */
export default function reducer(
  state = initialState,
  action: GateKeeperActionTypes
): ImmutableGateKeeperState {
  switch (action.type) {
    case RECORD:
      return state.merge({
        result: { ...action.result },
        success: action.success
      });
    default:
      return state;
  }
}

// actions

/** authenticate success action type */
export const RECORD = '@onaio/gatekeeper/reducer/RECORD';

// action creators
/** record the result of the authentication attempt
 * @param {boolean} success - whether it was successful or not
 * @param {{ [key: string]: any }} result - an object containing result information
 */
export const recordResult = (
  success: boolean,
  result: { [key: string]: any } = {}
): RecordAction => ({
  result,
  success,
  type: RECORD
});

// selectors

/** get result
 * @param {Partial<Store>} state - the redux store
 */
export function getResult(state: Partial<Store>): { [key: string]: any } {
  return (state as any)[reducerName].result;
}

/** get success
 * @param {Partial<Store>} state - the redux store
 */
export function getSuccess(state: Partial<Store>): boolean {
  return (state as any)[reducerName].success;
}
