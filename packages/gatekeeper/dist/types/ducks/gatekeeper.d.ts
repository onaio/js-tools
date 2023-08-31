import { AnyAction, Store } from 'redux';
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
/** action that informs on progress of fetch user async action in custom callback */
export interface AuthenticationProgressAction extends AnyAction {
  working: boolean;
  type: typeof AUTHENTICATION_PROGRESS;
}
/** interface to describe GateKeeper state */
export interface GateKeeperState {
  result: {
    [key: string]: any;
  } /** stores the result of the auth attempt */;
  success: boolean | null /** was it successful or not */;
  working: boolean /** is the async call to authenticate in progress or not? */;
}
/** Create type for GateKeeper reducer actions */
export type GateKeeperActionTypes = RecordAction | AnyAction;
/** immutable GateKeeper state */
export type ImmutableGateKeeperState = GateKeeperState &
  SeamlessImmutable.ImmutableObject<GateKeeperState>;
/** Initial state for GateKeeper */
export declare const initialState: ImmutableGateKeeperState;
/** GateKeeper reducer function
 * @param {initialState} state - the initial state
 * @param {GateKeeperActionTypes} action - the action
 */
export default function reducer(
  state: ImmutableGateKeeperState | undefined,
  action: GateKeeperActionTypes
): ImmutableGateKeeperState;
/** authenticate success action type */
export declare const RECORD = '@onaio/gatekeeper/reducer/RECORD';
export declare const AUTHENTICATION_PROGRESS = '@onaio/gatekeeper/reducer/AUTHENTICATION_PROGRESS';
/** record the result of the authentication attempt
 * @param {boolean} success - whether it was successful or not
 * @param {{ [key: string]: any }} result - an object containing result information
 */
export declare const recordResult: (
  success: boolean,
  result?: {
    [key: string]: any;
  }
) => RecordAction;
/** creates an AuthenticationProgressAction
 * @param {boolean} working - work state of the async call to authenticate
 *
 * @return {AuthenticationProgressAction}
 */
export declare const authenticationProgress: (working: boolean) => AuthenticationProgressAction;
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
/** returns if async call to authenticate is in progress
 * @param {Partial<Store>} state - the redux store
 */
export declare function isAuthenticating(state: Partial<Store>): boolean;
