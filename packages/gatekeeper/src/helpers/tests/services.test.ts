import * as sessionReducer from '@onaio/session-reducer';
import fetchMock from 'fetch-mock';
import { getOnadataUserInfo } from '../oauth';
import { fetchUser, oauth2Callback } from '../services';
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

    fetchMock.getOnce(url, JSON.stringify(data));

    const response = await oauth2Callback(hash, url, provider, getOnadataUserInfo);

    const expectedResponse = fixtures.onadataSession;

    expect(response).toEqual(expectedResponse);
  });

  it('fetchUser should work', async () => {
    const provider = fixtures.onadataAuth;
    const data = fixtures.onadataUser;
    const url = 'https://stage-api.ona.io/api/v1/user.json';
    const hash =
      '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc';
    fetchMock.getOnce('https://stage-api.ona.io/api/v1/user.json', JSON.stringify(data));

    // mock fetchUser
    const mock = jest.spyOn(sessionReducer, 'authenticateUser');

    await fetchUser(hash, url, provider, jest.fn());

    expect(mock).toHaveBeenCalledWith(
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
  });

  it('fetchUser should handle http errors', async () => {
    const provider = fixtures.onadataAuth;
    const url = 'https://stage-api.ona.io/api/v1/user.json';
    const hash =
      '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc';
    fetchMock.getOnce('https://stage-api.ona.io/api/v1/user.json', 500);
    let error;
    try {
      await fetchUser(hash, url, provider, jest.fn());
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('oAuth service oauth2Callback failed, HTTP status 500'));
  });

  it('fetchUser should handle API errors', async () => {
    const provider = fixtures.onadataAuth;
    const url = 'https://stage-api.ona.io/api/v1/user.json';
    const hash =
      '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc';
    fetchMock.getOnce('https://stage-api.ona.io/api/v1/user.json', {});
    let error;
    try {
      await fetchUser(hash, url, provider, jest.fn());
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('oAuth service oauth2Callback failed, data not returned'));
  });
});
