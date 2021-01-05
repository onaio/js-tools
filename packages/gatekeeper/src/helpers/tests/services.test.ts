import fetchMock from 'fetch-mock';
import { getOnadataUserInfo } from '../oauth';
import { fetchState, fetchUser, oauth2Callback, refreshToken } from '../services';
import { errorCallback } from '../utils';
import * as fixtures from './fixtures';

describe('gatekeeper/services', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetchMock.restore();
  });

  it('oauth2Callback should work', async () => {
    const provider = fixtures.onadataAuth;
    const data = fixtures.onadataUser;
    const url = 'https://stage-api.ona.io/api/v1/user.json';
    const hash =
      '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc';
    const urlObject: URL = new URL(hash, 'http://localhost/oauth/callback/onadata/');

    fetchMock.getOnce(url, JSON.stringify(data));

    const response = await oauth2Callback(urlObject, url, provider, getOnadataUserInfo);

    const expectedResponse = fixtures.onadataSessionWithOauthData;

    expect(response).toEqual(expectedResponse);
  });

  it('fetchUser should work', async () => {
    const provider = fixtures.onadataAuth;
    const data = fixtures.finalExtraData;
    const url = 'https://stage-api.ona.io/api/v1/user.json';
    const hash =
      '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc';
    const urlObject: URL = new URL(hash, 'http://localhost/oauth/callback/onadata/');
    fetchMock.getOnce('https://stage-api.ona.io/api/v1/user.json', JSON.stringify(data));
    // mock authenticateActionCreator
    const authenticateActionCreatorMock = jest.fn();
    const recordResultActionCreator = jest.fn();

    await fetchUser(
      urlObject,
      url,
      provider,
      authenticateActionCreatorMock,
      recordResultActionCreator
    );

    expect(authenticateActionCreatorMock).toHaveBeenCalledWith(
      true,
      {
        email: 'mosh@example.com',
        gravatar:
          'https://secure.gravatar.com/avatar/ae22ab897231db07205bd5d00e64cbbf?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
        name: 'mosh',
        username: 'moshthepitt'
      },
      data
    );

    expect(recordResultActionCreator).toHaveBeenCalledWith(true, data);
  });

  it('fetchUser should handle http errors', async () => {
    const provider = fixtures.onadataAuth;
    const url = 'https://stage-api.ona.io/api/v1/user.json';
    const hash =
      '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc';
    const urlObject: URL = new URL(hash, 'http://localhost/oauth/callback/onadata/');
    fetchMock.getOnce('https://stage-api.ona.io/api/v1/user.json', 500);
    let error;
    const recordResultActionCreator = jest.fn();
    try {
      await fetchUser(urlObject, url, provider, jest.fn(), recordResultActionCreator);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('oAuth service oauth2Callback failed, HTTP status 500'));
    expect(recordResultActionCreator).toHaveBeenCalledWith(false, { error });
  });

  it('fetchUser should handle API errors', async () => {
    const provider = fixtures.onadataAuth;
    const url = 'https://stage-api.ona.io/api/v1/user.json';
    const hash =
      '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc';
    const urlObject: URL = new URL(hash, 'http://localhost/oauth/callback/onadata/');
    fetchMock.getOnce('https://stage-api.ona.io/api/v1/user.json', {});
    const recordResultActionCreator = jest.fn();
    let error;
    try {
      await fetchUser(urlObject, url, provider, jest.fn(), recordResultActionCreator);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('oAuth service oauth2Callback failed, data not returned'));
    expect(recordResultActionCreator).toHaveBeenCalledWith(false, { error });
  });

  it('fetchState works correctly', async () => {
    const url = 'http://localhost:3000/oauth/state';
    fetchMock.getOnce(url, fixtures.expressAPIResponse);
    const authenticateCreatorMock = jest.fn();
    const recordResultCreatorMock = jest.fn();
    const logoutMock = jest.fn();
    fetchState(url, {
      authenticateActionCreator: authenticateCreatorMock,
      logoutActionCreator: logoutMock,
      recordResultActionCreator: recordResultCreatorMock
    });
    await new Promise(resolve => setImmediate(resolve));
    const extraData = {
      oAuth2Data: {
        access_token: 'hunter2',
        expires_in: 1142,
        refresh_token: 'iloveoov',
        scope: 'read write',
        token_type: 'bearer'
      },
      preferredName: 'Superset User',
      roles: ['Provider'],
      userName: 'superset-user'
    };

    expect(authenticateCreatorMock).toHaveBeenCalledWith(
      true,
      {
        email: '',
        gravatar: '',
        name: '',
        username: 'superset-user'
      },
      extraData
    );
    expect(recordResultCreatorMock).toHaveBeenCalledWith(true, extraData);
  });

  it('fetchState handles unexpected response', async () => {
    const url = 'http://localhost:3000/oauth/state';
    const authenticateCreatorMock = jest.fn();
    const recordResultCreatorMock = jest.fn();
    const logoutMock = jest.fn();
    const errorCallbackMock = jest.fn();
    fetchMock.getOnce(url, { error: 'Not authorized' });
    fetchState(url, {
      authenticateActionCreator: authenticateCreatorMock,
      errorCallbackFn: errorCallbackMock,
      logoutActionCreator: logoutMock,
      recordResultActionCreator: recordResultCreatorMock
    });
    await new Promise(resolve => setImmediate(resolve));

    expect(logoutMock).toHaveBeenCalled();
    expect(authenticateCreatorMock).not.toHaveBeenCalled();
    expect(recordResultCreatorMock).toHaveBeenCalledTimes(1);
    expect(errorCallbackMock).toHaveBeenCalledTimes(1);
  });

  it('refreshToken works correctly', async () => {
    const url = 'http://localhost:3000/refresh/token';
    fetchMock.getOnce(url, fixtures.expressAPIResponse);
    const authenticateCreatorMock = jest.fn();
    const recordResultCreatorMock = jest.fn();
    const dispatch = jest.fn();
    refreshToken(url, dispatch, {
      authenticateActionCreator: authenticateCreatorMock,
      recordResultActionCreator: recordResultCreatorMock
    });
    await new Promise(resolve => setImmediate(resolve));
    const extraData = {
      oAuth2Data: {
        access_token: 'hunter2',
        expires_in: 1142,
        refresh_token: 'iloveoov',
        scope: 'read write',
        token_type: 'bearer'
      },
      preferredName: 'Superset User',
      roles: ['Provider'],
      userName: 'superset-user'
    };

    expect(authenticateCreatorMock).toHaveBeenCalledWith(
      true,
      {
        email: '',
        gravatar: '',
        name: '',
        username: 'superset-user'
      },
      extraData
    );
    expect(recordResultCreatorMock).toHaveBeenCalledWith(true, extraData);
  });

  it('refreshToken handles exceptions', async () => {
    const url = 'http://localhost:3000/refresh/token';
    const url2 = 'http://localhost:5000/refresh/token';
    fetchMock.getOnce(url, { error: 'Not authorized' });
    fetchMock.getOnce(url2, 500);
    const authenticateCreatorMock = jest.fn();
    const recordResultCreatorMock = jest.fn();
    const errorCallbackMock = jest.fn();
    const dispatch = jest.fn();
    refreshToken(url, dispatch, {
      authenticateActionCreator: authenticateCreatorMock,
      errorCallbackFn: errorCallbackMock,
      recordResultActionCreator: recordResultCreatorMock
    });
    await new Promise(resolve => setImmediate(resolve));
    expect(errorCallbackMock).toHaveBeenCalledTimes(1);

    refreshToken(url2, dispatch, {
      authenticateActionCreator: authenticateCreatorMock,
      errorCallbackFn: errorCallbackMock,
      recordResultActionCreator: recordResultCreatorMock
    });
    await new Promise(resolve => setImmediate(resolve));
    expect(errorCallbackMock).toHaveBeenCalledTimes(2);
  });
});
