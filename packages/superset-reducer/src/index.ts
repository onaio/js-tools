import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** the reducer name */
export const reducerName = 'superset';

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
export type SupersetActionTypes = AuthorizeSupersetAction | ResetSupersetAction | AnyAction;

/** interface for Superset state */
interface SupersetState {
  authorized: boolean | null;
}

/** immutable Superset state */
export type ImmutableSupersetState = SupersetState &
  SeamlessImmutable.ImmutableObject<SupersetState>;

/** initial Superset state */
const initialState: ImmutableSupersetState = SeamlessImmutable({
  authorized: null
});

/** the Superset reducer function */
export default function reducer(state = initialState, action: SupersetActionTypes): SupersetState {
  switch (action.type) {
    case AUTHORIZE:
      return state.merge({
        authorized: action.authorized
      });
    case RESET:
      return state.merge({
        authorized: null
      });
    default:
      return state;
  }
}

// actions
/** authorize action type */
export const AUTHORIZE = 'reveal/reducer/superset/AUTHORIZE';

/** reset action type */
export const RESET = 'reveal/reducer/superset/RESET';

// action creators

/** authorize action creator
 * @param {boolean} authorized - whether superset is authorized or not
 */
export const authorizeSuperset = (authorized: boolean): AuthorizeSupersetAction => ({
  authorized,
  type: AUTHORIZE
});

/** reset action creator */
export const resetSuperset = (): ResetSupersetAction => ({
  type: RESET
});

// selectors

/** check if superset is authorized
 * @param {Partial<Store>} state - the redux store
 */
export function isAuthorized(state: Partial<Store>): boolean | null {
  return (state as any)[reducerName].authorized;
}
