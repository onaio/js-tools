import { ActionCreator, AnyAction, Store } from 'redux';
import reducerRegistry from '../..';

export const reducerName = 'users';

interface User {
  username: string;
}

interface AddUserAction extends AnyAction {
  payload?: User;
  type: typeof ADD_USER;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: []
};

export default function reducer(state = initialState, action: AddUserAction): UserState {
  switch (action.type) {
    case ADD_USER:
      if (action.payload) {
        return { users: [...state.users, action.payload] };
      }
      return state;
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// actions
export const ADD_USER = 'redux-registry/reducer/ADD_USER';

// action creators
export const addUser: ActionCreator<AddUserAction> = (newUser: User) => ({
  payload: newUser,
  type: ADD_USER
});

// selectors
export function selectAllUsers(state: Partial<Store>) {
  return (state as any)[reducerName].users;
}
