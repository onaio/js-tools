import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
export declare const expiryTimeNotFound = 'Expiry Time Not Found';
export declare const reducerName = 'session';
/** Interface for authenticate action */
export interface AuthenticateAction extends AnyAction {
  authenticated: boolean;
  type: typeof AUTHENTICATE;
}
/** Interface for update extra data action */
export interface UpdateExtraDataAction extends AnyAction {
  data: {
    [key: string]: any;
  };
  type: typeof UPDATE_DATA;
}
/** Interface for logout action */
export interface LogOutAction extends AnyAction {
  type: typeof LOGOUT;
}
/** Create type for session reducer actions */
export declare type SessionActionTypes =
  | AuthenticateAction
  | LogOutAction
  | UpdateExtraDataAction
  | AnyAction;
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
 * @param {SessionActionTypes} action - the action
 */
export default function reducer(
  state: ImmutableSessionState | undefined,
  action: SessionActionTypes
): ImmutableSessionState;
/** authenticate user action type */
export declare const AUTHENTICATE = '@onaio/session-reducer/reducer/AUTHENTICATE';
/** authenticate user action type */
export declare const UPDATE_DATA = '@onaio/session-reducer/reducer/UPDATE_DATA';
/** logout user action type */
export declare const LOGOUT = '@onaio/session-reducer/reducer/LOGOUT';
/** authenticate user action creator
 * @param {boolean} authenticated - whether the user is authenticated or not
 * @param {User} user - the user object
 * @param {{ [key: string]: any }} extraData - an object containing any extra information
 */
export declare const authenticateUser: (
  authenticated: boolean,
  user: User,
  extraData?: {
    [key: string]: any;
  }
) => AuthenticateAction;
/** update extraData action creator
 * @param { { [key: string]: any } } data - an object containing any extra information
 */
export declare const updateExtraData: (data: { [key: string]: any }) => UpdateExtraDataAction;
/** logout user action creator */
export declare const logOutUser: () => LogOutAction;
/** check if authenticated
 * @param {Partial<Store>} state - the redux store
 */
export declare function isAuthenticated(state: Partial<Store>): boolean;
/** get extraData
 * @param {Partial<Store>} state - the redux store
 */
export declare function getExtraData(
  state: Partial<Store>
): {
  [key: string]: any;
};
/** get user
 * @param {Partial<Store>} state - the redux store
 */
export declare function getUser(state: Partial<Store>): User;
/** get API Token from the Redux store
 * @param {Partial<Store>} state - the redux store
 */
export declare function getApiToken(state: Partial<Store>): string;
/** get Access Token from the Redux store
 * @param {Partial<Store>} state - the redux store
 */
export declare function getAccessToken(state: Partial<Store>): string | null;
/** get the oAuth2 provider state parameter from the Redux store
 * @param {Partial<Store>} state - the redux store
 */
export declare function getOauthProviderState(state: Partial<Store>): string | null;
/** check if token is expired
 * @param {Partial<Store>} state - the redux store
 */
export declare function isTokenExpired(state: Partial<Store>): boolean | typeof expiryTimeNotFound;
/** check if refresh token is expired
 * @param {Partial<Store>} state - the redux store
 */
export declare function isRefreshTokenExpired(
  state: Partial<Store>
): boolean | typeof expiryTimeNotFound;
