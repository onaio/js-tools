import reducerRegistry, { combine } from '@onaio/redux-reducer-registry';
import { FlushThunks } from 'redux-testkit';
import store, { getConnectedStore } from '..';
import messages, { selectAllMessages, sendMessage } from './ducks/messages';

describe('store', () => {
  let flushThunks;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    jest.resetAllMocks();
  });

  it('should be a redux store', () => {
    expect(typeof store.subscribe).toEqual('function');
    expect(typeof store.dispatch).toEqual('function');
    expect(typeof store.getState).toEqual('function');
    expect(typeof store.replaceReducer).toEqual('function');
  });

  it('should include createRouterReducer by default', () => {
    expect(store.getState().router).toEqual({
      action: 'POP',
      location: {
        hash: '',
        pathname: '/',
        search: '',
        state: undefined
      }
    });
  });

  it('should register a reducer', () => {
    reducerRegistry.register('messages', messages);
    expect(store.getState().messages).toEqual({ messages: [] });
  });

  it('should be able to use loaded reducers', () => {
    reducerRegistry.register('messages', messages);
    // dispatch action should work
    store.dispatch(sendMessage({ user: 'bob', message: 'hello' }));
    expect(store.getState().messages).toEqual({ messages: [{ user: 'bob', message: 'hello' }] });
    // retrieving data should work
    expect(selectAllMessages(store.getState())).toEqual([{ message: 'hello', user: 'bob' }]);
  });

  it('should be able to work with initial state', () => {
    reducerRegistry.register('messages', messages);
    const newStore = getConnectedStore(reducerRegistry.getReducers(), {
      messages: [{ foo: 'bar' }]
    });
    expect(newStore.getState().messages).toEqual([{ foo: 'bar' }]);
  });

  it('should be able to create a connected store', () => {
    /** create default reducers */
    const defaultReducers = {};
    /** Create the store */
    const newStore = getConnectedStore(defaultReducers);

    /** Set listener to add reducers to store when registered */
    reducerRegistry.setChangeListener(reducers => {
      newStore.replaceReducer(combine(reducers));
    });

    /** should result in a regular redux store */
    expect(typeof newStore.subscribe).toEqual('function');
    expect(typeof newStore.dispatch).toEqual('function');
    expect(typeof newStore.getState).toEqual('function');
    expect(typeof newStore.replaceReducer).toEqual('function');

    /** should be able to use registered reducers */
    reducerRegistry.register('messages', messages);
    // dispatch action should work
    newStore.dispatch(sendMessage({ user: 'bob', message: 'hello' }));
    expect(newStore.getState().messages).toEqual({
      messages: [{ user: 'bob', message: 'hello' }]
    });
    // retrieving data should work
    expect(selectAllMessages(newStore.getState())).toEqual([{ message: 'hello', user: 'bob' }]);
  });
});
