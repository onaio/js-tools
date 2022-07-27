import MockDate from 'mockdate';
import {
  getOnadataUserInfo,
  getOpenSRPUserInfo,
  getProviderFromOptions,
  Providers
} from '../oauth';
import {
  finalExtraData,
  onadataAuth,
  onadataSessionWithOauthData,
  opensrpOauthClientData,
  openSRPSession
} from './fixtures';

describe('gatekeeper/oAuth', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getProviderFromOptions should work', async () => {
    MockDate.set('1/1/2020');
    const expected = onadataAuth;
    const providersObj: Providers = {
      onadata: {
        accessTokenUri: 'https://stage-api.ona.io/o/token/',
        authorizationUri: 'https://stage-api.ona.io/o/authorize/',
        clientId: 'hunter2',
        redirectUri: 'https://example.com/oauth/callback/onadata/',
        scopes: ['read', 'write'],
        state: 'abc',
        userUri: 'https://stage-api.ona.io/api/v1/user.json'
      }
    };
    expect(getProviderFromOptions(providersObj.onadata)).toEqual(expected);
  });

  it('getOnadataUserInfo should work', async () => {
    expect(getOnadataUserInfo(finalExtraData)).toEqual(onadataSessionWithOauthData);
  });

  it('getOpenSRPUserInfo should work', async () => {
    MockDate.set('1/1/2020');
    expect(getOpenSRPUserInfo(opensrpOauthClientData)).toEqual(openSRPSession);
  });

  MockDate.reset();
});
