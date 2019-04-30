import { ActionCreator, AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
export declare const reducerName = 'gatekeeper';
/** Interface for Record action */
export interface RecordAction extends AnyAction {
  result: {
    [key: string]: any;
  };
  success: boolean | null;
  type: typeof RECORD;
}
/** interface to describe GateKeeper state */
export interface GateKeeperState {
  result: {
    [key: string]: any;
  } /** stores the result of the auth attempt */;
  success: boolean | null /** was it successful or not */;
}
/** immutable GateKeeper state */
export declare type ImmutableGateKeeperState = GateKeeperState &
  SeamlessImmutable.ImmutableObject<GateKeeperState>;
/** Initial state for GateKeeper */
export declare const initialState: ImmutableGateKeeperState;
/** GateKeeper reducer function
 * @param {initialState} state - the initial state
 * @param {AnyAction} action - the action
 */
export default function reducer(
  state: ImmutableGateKeeperState | undefined,
  action: AnyAction
): ImmutableGateKeeperState;
/** authenticate success action type */
export declare const RECORD = '@onaio/gatekeeper/reducer/RECORD';
/** record the result of the authentication attempt
 * @param {boolean} success - whether it was successful or not
 * @param {{ [key: string]: any }} result - an object containing result information
 */
export declare const recordResult: ActionCreator<RecordAction>;
/** get result
 * @param {Partial<Store>} state - the redux store
 */
export declare function getResult(
  state: Partial<Store>
): {
  [key: string]: any;
};
/** get success
 * @param {Partial<Store>} state - the redux store
 */
export declare function getSuccess(state: Partial<Store>): boolean;
