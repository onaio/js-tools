import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { FlushThunks } from 'redux-testkit';
import thunk from 'redux-thunk';
import session, { authenticateUser, getAPIToken, getUser, isAuthenticated, logOutUser } from '..';
import { onadataUser, sessionUser } from './fixtures';

describe('reducers/session', () => {
  let flushThunks;
  let store: Store;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(combineReducers({ session }), applyMiddleware(flushThunks, thunk));
    jest.resetAllMocks();
  });

  it('should have initial state', () => {
    // initially logged out
    expect(isAuthenticated(store.getState())).toBe(false);
    // initially no API token
    expect(getAPIToken(store.getState())).toEqual('');
    // initially empty user object
    expect(getUser(store.getState())).toEqual({
      email: '',
      gravatar: '',
      name: '',
      username: ''
    });
  });

  it('should be able to do authentication', () => {
    // initially logged out
    expect(isAuthenticated(store.getState())).toBe(false);
    // initially no API token
    expect(getAPIToken(store.getState())).toEqual('');
    // initially empty user object
    expect(getUser(store.getState())).toEqual({
      email: '',
      gravatar: '',
      name: '',
      username: ''
    });

    // call action to log in
    store.dispatch(authenticateUser('the api token', true, sessionUser));

    // now logged in
    expect(isAuthenticated(store.getState())).toBe(true);
    // should have api token
    expect(getAPIToken(store.getState())).toEqual('the api token');
    // valid user object
    expect(getUser(store.getState())).toEqual({
      email: 'mosh@example.com',
      extraData: onadataUser,
      gravatar:
        'https://secure.gravatar.com/avatar/ae22ab897231db07205bd5d00e64cbbf?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
      name: 'mosh',
      username: 'moshthepitt'
    });

    // call action to log out
    store.dispatch(logOutUser());

    // now logged out
    expect(isAuthenticated(store.getState())).toBe(false);
    // now no API token
    expect(getAPIToken(store.getState())).toEqual('');
    // now an empty user object
    expect(getUser(store.getState())).toEqual({
      email: '',
      gravatar: '',
      name: '',
      username: ''
    });
  });
});
