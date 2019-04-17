import { ActionCreator, AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
export declare const reducerName = 'session';
/** Interface for authenticate action */
export interface AuthenticateAction extends AnyAction {
  authenticated: boolean;
  type: typeof AUTHENTICATE;
}
/** Interface for logout action */
export interface LogOutAction extends AnyAction {
  type: typeof LOGOUT;
}
/** Interface for user object in session store */
export interface User {
  email?: string;
  gravatar?: string;
  name: string;
  username: string;
}
/** interface to describe session state */
export interface SessionState {
  extraData?: {
    [key: string]: any;
  };
  authenticated: boolean;
  user: User;
}
/** immutable session state */
export declare type ImmutableSessionState = SessionState &
  SeamlessImmutable.ImmutableObject<SessionState>;
/** Initial state for session */
export declare const initialState: ImmutableSessionState;
/** session reducer function
 * @param {initialState} state - the initial state
 * @param {AnyAction} action - the action
 */
export default function reducer(
  state: ImmutableSessionState | undefined,
  action: AnyAction
): ImmutableSessionState;
/** authenticate user action type */
export declare const AUTHENTICATE = '@onaio/redux-user-session/reducer/AUTHENTICATE';
/** logout user action type */
export declare const LOGOUT = '@onaio/redux-user-session/reducer/LOGOUT';
/** authenticate user action creator
 * @param {boolean} authenticated - whether the user is authenticated or not
 * @param {User} user - the user object
 * @param {{ [key: string]: any }} extraData - an object containing any extra information
 */
export declare const authenticateUser: ActionCreator<AuthenticateAction>;
/** logout user action creator */
export declare const logOutUser: ActionCreator<LogOutAction>;
/** check if authenticated
 * @param {Partial<Store>} state - the redux store
 */
export declare function isAuthenticated(state: Partial<Store>): any;
/** get extraData
 * @param {Partial<Store>} state - the redux store
 */
export declare function getExtraData(state: Partial<Store>): any;
/** get user
 * @param {Partial<Store>} state - the redux store
 */
export declare function getUser(state: Partial<Store>): any;
