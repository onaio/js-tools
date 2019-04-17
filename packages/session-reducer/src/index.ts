import { ActionCreator, AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

export const reducerName = 'session';

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
  extraData?: { [key: string]: any };
  gravatar?: string;
  name: string;
  username: string;
}

/** interface to describe session state */
export interface SessionState {
  apiToken: string;
  authenticated: boolean;
  user: User;
}

/** immutable session state */
export type ImmutableSessionState = SessionState & SeamlessImmutable.ImmutableObject<SessionState>;

/** Initial state for session */
export const initialState: ImmutableSessionState = SeamlessImmutable({
  apiToken: '',
  authenticated: false,
  user: {
    email: '',
    gravatar: '',
    name: '',
    username: ''
  }
});

/** session reducer function
 * @param {initialState} state - the initial state
 * @param {AnyAction} action - the action
 */
export default function reducer(state = initialState, action: AnyAction): ImmutableSessionState {
  switch (action.type) {
    case AUTHENTICATE:
      return state.merge({
        apiToken: action.apiToken,
        authenticated: action.authenticated,
        user: { ...action.user }
      });
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

// actions
/** authenticate user action type */
export const AUTHENTICATE = '@onaio/redux-user-session/reducer/AUTHENTICATE';

/** logout user action type */
export const LOGOUT = '@onaio/redux-user-session/reducer/LOGOUT';

// action creators
/** authenticate user action creator */
export const authenticateUser: ActionCreator<AuthenticateAction> = (
  apiToken: string,
  authenticated: boolean,
  user: User
) => ({
  apiToken,
  authenticated,
  type: AUTHENTICATE,
  user
});

/** logout user action creator */
export const logOutUser: ActionCreator<LogOutAction> = () => ({ type: LOGOUT });

// selectors
/** check if authenticated
 * @param {Partial<Store>} state - the redux store
 */
export function isAuthenticated(state: Partial<Store>) {
  return (state as any)[reducerName].authenticated;
}

/** get apiToken
 * @param {Partial<Store>} state - the redux store
 */
export function getAPIToken(state: Partial<Store>) {
  return (state as any)[reducerName].apiToken;
}

/** get user
 * @param {Partial<Store>} state - the redux store
 */
export function getUser(state: Partial<Store>) {
  return (state as any)[reducerName].user;
}
