import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { FlushThunks } from 'redux-testkit';
import thunk from 'redux-thunk';
import session, {
  authenticateUser,
  getAccessToken,
  getApiToken,
  getExtraData,
  getOauthProviderState,
  getUser,
  isAuthenticated,
  logOutUser,
  updateExtraData
} from '..';
import {
  adminUserRole,
  finalUpdateExtraData,
  firstUpdateExtraData,
  onadataUser,
  Permissions,
  publicUserRole,
  secondUpdateExtraData,
  sessionUser
} from './fixtures';

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
    // initially no extra data
    expect(getExtraData(store.getState())).toEqual({});
    // initially empty user object
    expect(getUser(store.getState())).toEqual({
      email: '',
      gravatar: '',
      name: '',
      username: ''
    });
    // initially no extra data
    expect(getApiToken(store.getState())).toEqual(null);
    expect(getAccessToken(store.getState())).toEqual(null);
    expect(getOauthProviderState(store.getState())).toEqual(null);
  });

  it('should be able to do authentication', () => {
    // initially logged out
    expect(isAuthenticated(store.getState())).toBe(false);
    // initially no extra data
    expect(getExtraData(store.getState())).toEqual({});
    // initially empty user object
    expect(getUser(store.getState())).toEqual({
      email: '',
      gravatar: '',
      name: '',
      username: ''
    });
    // initially no extra data
    expect(getApiToken(store.getState())).toEqual(null);
    expect(getAccessToken(store.getState())).toEqual(null);
    expect(getOauthProviderState(store.getState())).toEqual(null);

    // call action to log in
    store.dispatch(authenticateUser(true, sessionUser, onadataUser));

    // now logged in
    expect(isAuthenticated(store.getState())).toBe(true);
    // should have extra data
    expect(getExtraData(store.getState())).toEqual(onadataUser);
    // valid user object
    expect(getUser(store.getState())).toEqual({
      email: 'mosh@example.com',
      gravatar:
        'https://secure.gravatar.com/avatar/ae22ab897231db07205bd5d00e64cbbf?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
      name: 'mosh',
      username: 'moshthepitt'
    });
    // should have api token
    expect(getApiToken(store.getState())).toEqual('the api token');
    // should have oAuth2Data and access_token
    expect(getAccessToken(store.getState())).toEqual('hunter2');
    // should have oAuth2Data and state
    expect(getOauthProviderState(store.getState())).toEqual('opensrp');

    // call action to log out
    store.dispatch(logOutUser());

    // now logged out
    expect(isAuthenticated(store.getState())).toBe(false);
    // now no extra data
    expect(getExtraData(store.getState())).toEqual({});
    // now an empty user object
    expect(getUser(store.getState())).toEqual({
      email: '',
      gravatar: '',
      name: '',
      username: ''
    });
    // no extra data when logged out
    expect(getApiToken(store.getState())).toEqual(null);
    expect(getAccessToken(store.getState())).toEqual(null);
    expect(getOauthProviderState(store.getState())).toEqual(null);
  });

  it('should be able to update extraData', () => {
    // initially logged out
    expect(isAuthenticated(store.getState())).toBe(false);
    // initially no extra data
    expect(getExtraData(store.getState())).toEqual({});
    // initially empty user object
    expect(getUser(store.getState())).toEqual({
      email: '',
      gravatar: '',
      name: '',
      username: ''
    });

    // call action to log in
    store.dispatch(authenticateUser(true, sessionUser, onadataUser));

    // now logged in
    expect(isAuthenticated(store.getState())).toBe(true);
    // should have extra data
    expect(getExtraData(store.getState())).toEqual(onadataUser);

    // call action to update extraData with public user role object
    store.dispatch(updateExtraData(publicUserRole));
    // should update extra data
    expect(getExtraData(store.getState())).toEqual(firstUpdateExtraData);

    // call action to update extraData with admin user role object
    store.dispatch(updateExtraData(adminUserRole));
    // should update extra data
    expect(getExtraData(store.getState())).toEqual(secondUpdateExtraData);

    // call action to update permissions object in extraData
    store.dispatch(updateExtraData(Permissions));
    // should update extra data
    expect(getExtraData(store.getState())).toEqual(finalUpdateExtraData);
  });

  it('should update nested extraData', () => {
    expect(getExtraData(store.getState())).toEqual({});
    const data = {
      a: {
        b: {
          c: 'Ona'
        }
      },
      d: 'Data'
    };

    // add this data to the store
    store.dispatch(updateExtraData(data));
    expect(getExtraData(store.getState())).toEqual(data);

    // update d only
    store.dispatch(updateExtraData({ d: 'Ona' }));
    expect(getExtraData(store.getState())).toEqual({
      a: {
        b: {
          c: 'Ona'
        }
      },
      d: 'Ona'
    });

    // update a only
    store.dispatch(
      updateExtraData({
        a: {
          b: {
            c: 'Data'
          }
        }
      })
    );
    expect(getExtraData(store.getState())).toEqual({
      a: {
        b: {
          c: 'Data'
        }
      },
      d: 'Ona'
    });
  });
});
