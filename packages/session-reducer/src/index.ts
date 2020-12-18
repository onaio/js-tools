import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

export const expiryTimeNotFound = 'Expiry Time Not Found';
export const reducerName = 'session';

/** Interface for authenticate action */
export interface AuthenticateAction extends AnyAction {
  authenticated: boolean;
  type: typeof AUTHENTICATE;
}

/** Interface for update extra data action */
export interface UpdateExtraDataAction extends AnyAction {
  data: { [key: string]: any };
  type: typeof UPDATE_DATA;
}

/** Interface for logout action */
export interface LogOutAction extends AnyAction {
  type: typeof LOGOUT;
}

/** Create type for session reducer actions */
export type SessionActionTypes =
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
  extraData?: { [key: string]: any };
  authenticated: boolean;
  user: User;
}

/** immutable session state */
export type ImmutableSessionState = SessionState & SeamlessImmutable.ImmutableObject<SessionState>;

/** Initial state for session */
export const initialState: ImmutableSessionState = SeamlessImmutable({
  authenticated: false,
  extraData: {},
  user: {
    email: '',
    gravatar: '',
    name: '',
    username: ''
  }
});

/** session reducer function
 * @param {initialState} state - the initial state
 * @param {SessionActionTypes} action - the action
 */
export default function reducer(
  state = initialState,
  action: SessionActionTypes
): ImmutableSessionState {
  switch (action.type) {
    case AUTHENTICATE:
      return state.merge({
        authenticated: action.authenticated,
        extraData: { ...action.extraData },
        user: { ...action.user }
      });
    case UPDATE_DATA:
      return state.merge({
        ...state,
        extraData: { ...state.extraData, ...action.data }
      });
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

// actions
/** authenticate user action type */
export const AUTHENTICATE = '@onaio/session-reducer/reducer/AUTHENTICATE';

/** authenticate user action type */
export const UPDATE_DATA = '@onaio/session-reducer/reducer/UPDATE_DATA';

/** logout user action type */
export const LOGOUT = '@onaio/session-reducer/reducer/LOGOUT';

// action creators
/** authenticate user action creator
 * @param {boolean} authenticated - whether the user is authenticated or not
 * @param {User} user - the user object
 * @param {{ [key: string]: any }} extraData - an object containing any extra information
 */
export const authenticateUser = (
  authenticated: boolean,
  user: User,
  extraData: { [key: string]: any } = {}
): AuthenticateAction => ({
  authenticated,
  extraData,
  type: AUTHENTICATE,
  user
});

/** update extraData action creator
 * @param { { [key: string]: any } } data - an object containing any extra information
 */
export const updateExtraData = (data: { [key: string]: any }): UpdateExtraDataAction => ({
  data,
  type: UPDATE_DATA
});

/** logout user action creator */
export const logOutUser = (): LogOutAction => ({
  type: LOGOUT
});

// selectors
/** check if authenticated
 * @param {Partial<Store>} state - the redux store
 */
export function isAuthenticated(state: Partial<Store>): boolean {
  return (state as any)[reducerName].authenticated;
}

/** get extraData
 * @param {Partial<Store>} state - the redux store
 */
export function getExtraData(state: Partial<Store>): { [key: string]: any } {
  return (state as any)[reducerName].extraData;
}

/** get user
 * @param {Partial<Store>} state - the redux store
 */
export function getUser(state: Partial<Store>): User {
  return (state as any)[reducerName].user;
}

/** get API Token from the Redux store
 * @param {Partial<Store>} state - the redux store
 */
export function getApiToken(state: Partial<Store>): string {
  const extraData = (state as any)[reducerName].extraData;
  return extraData.api_token || null;
}

/** get Access Token from the Redux store
 * @param {Partial<Store>} state - the redux store
 */
export function getAccessToken(state: Partial<Store>): string | null {
  const extraData = (state as any)[reducerName].extraData;
  if (extraData.oAuth2Data && extraData.oAuth2Data.access_token) {
    return extraData.oAuth2Data.access_token;
  }
  return null;
}

/** get the oAuth2 provider state parameter from the Redux store
 * @param {Partial<Store>} state - the redux store
 */
export function getOauthProviderState(state: Partial<Store>): string | null {
  const extraData = (state as any)[reducerName].extraData;
  if (extraData.oAuth2Data && extraData.oAuth2Data.state) {
    return extraData.oAuth2Data.state;
  }
  return null;
}

/** check if token is expired
 * @param {Partial<Store>} state - the redux store
 */
export function isTokenExpired(state: Partial<Store>): boolean | typeof expiryTimeNotFound {
  const extraData = (state as any)[reducerName].extraData;
  if (
    extraData.oAuth2Data &&
    extraData.oAuth2Data.token_expires_at &&
    extraData.oAuth2Data.refresh_token
  ) {
    return new Date(Date.now()) > new Date(extraData.oAuth2Data.token_expires_at);
  }
  return expiryTimeNotFound;
}

/** check if refresh token is expired
 * @param {Partial<Store>} state - the redux store
 */
export function isRefreshTokenExpired(state: Partial<Store>): boolean | typeof expiryTimeNotFound {
  const extraData = (state as any)[reducerName].extraData;
  if (
    extraData.oAuth2Data &&
    extraData.oAuth2Data.refresh_expires_at &&
    extraData.oAuth2Data.refresh_token
  ) {
    return new Date(Date.now()) > new Date(extraData.oAuth2Data.refresh_expires_at);
  }
  return expiryTimeNotFound;
}
