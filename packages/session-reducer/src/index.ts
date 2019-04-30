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
 * @param {AnyAction} action - the action
 */
export default function reducer(state = initialState, action: AnyAction): ImmutableSessionState {
  switch (action.type) {
    case AUTHENTICATE:
      return state.merge({
        authenticated: action.authenticated,
        extraData: { ...action.extraData },
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
export const AUTHENTICATE = '@onaio/session-reducer/reducer/AUTHENTICATE';

/** logout user action type */
export const LOGOUT = '@onaio/session-reducer/reducer/LOGOUT';

// action creators
/** authenticate user action creator
 * @param {boolean} authenticated - whether the user is authenticated or not
 * @param {User} user - the user object
 * @param {{ [key: string]: any }} extraData - an object containing any extra information
 */
export const authenticateUser: ActionCreator<AuthenticateAction> = (
  authenticated: boolean,
  user: User,
  extraData: { [key: string]: any } = {}
) => ({
  authenticated,
  extraData,
  type: AUTHENTICATE,
  user
});

/** logout user action creator */
export const logOutUser: ActionCreator<LogOutAction> = () => ({ type: LOGOUT });

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
