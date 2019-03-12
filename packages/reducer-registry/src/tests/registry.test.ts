import reducerRegistry from '..';
import store, { getStore } from '../store';
import messages, { sendMessage } from './ducks/messages';
import users, { addUser, selectAllUsers } from './ducks/users';

describe('reducer-registry', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be a redux store', () => {
    expect(typeof store.subscribe).toEqual('function');
    expect(typeof store.dispatch).toEqual('function');
    expect(typeof store.getState).toEqual('function');
    expect(typeof store.replaceReducer).toEqual('function');
  });

  it('should register a reducer', () => {
    reducerRegistry.register('users', users);
    expect(store.getState().users).toEqual({ users: [] });
  });

  it('should be able to use loaded reducers', () => {
    reducerRegistry.register('users', users);
    reducerRegistry.register('messages', messages);
    // dispatch action should work
    store.dispatch(addUser('bob'));
    expect(store.getState().users).toEqual({ users: ['bob'] });
    store.dispatch(sendMessage({ user: 'bob', message: 'hello' }));
    expect(store.getState().messages).toEqual({ messages: [{ user: 'bob', message: 'hello' }] });
    // retrieving data should work
    store.dispatch(addUser('mosh'));
    expect(selectAllUsers(store.getState())).toEqual(['bob', 'mosh']);
  });

  it('should preserve initial state', () => {
    const initialState = {
      things: ['users', 'messages'],
      x: 1
    };
    reducerRegistry.register('users', users);
    const newStore = getStore(reducerRegistry.getReducers(), initialState);
    expect(newStore.getState().x).toEqual(1);
    expect(newStore.getState().things).toEqual(['users', 'messages']);
  });
});
