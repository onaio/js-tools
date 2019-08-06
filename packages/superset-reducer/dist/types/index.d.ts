import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
/** the reducer name */
export declare const reducerName = 'superset';
/** interface for authorize action */
interface AuthorizeSupersetAction extends AnyAction {
  authorized: boolean;
  type: typeof AUTHORIZE;
}
/** interface for reset action */
interface ResetSupersetAction extends AnyAction {
  type: typeof RESET;
}
/** Create type for Superset reducer actions */
export declare type SupersetActionTypes = AuthorizeSupersetAction | ResetSupersetAction | AnyAction;
/** interface for Superset state */
interface SupersetState {
  authorized: boolean | null;
}
/** immutable Superset state */
export declare type ImmutableSupersetState = SupersetState &
  SeamlessImmutable.ImmutableObject<SupersetState>;
/** the Superset reducer function */
export default function reducer(
  state: ImmutableSupersetState | undefined,
  action: SupersetActionTypes
): SupersetState;
/** authorize action type */
export declare const AUTHORIZE = 'reveal/reducer/superset/AUTHORIZE';
/** reset action type */
export declare const RESET = 'reveal/reducer/superset/RESET';
/** authorize action creator
 * @param {boolean} authorized - whether superset is authorized or not
 */
export declare const authorizeSuperset: (authorized: boolean) => AuthorizeSupersetAction;
/** reset action creator */
export declare const resetSuperset: () => ResetSupersetAction;
/** check if superset is authorized
 * @param {Partial<Store>} state - the redux store
 */
export declare function isAuthorized(state: Partial<Store>): boolean | null;
export {};
