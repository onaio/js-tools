import { getProviderFromOptions, Providers } from '../oauth';
import * as fixtures from './fixtures';

describe('gatekeeper/oAuth', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getProviderFromOptions should work', async () => {
    const expected = fixtures.onadataAuth;
    const providersObj: Providers = {
      onadata: {
        accessTokenUri: 'https://stage-api.ona.io/o/token/',
        authorizationUri: 'https://stage-api.ona.io/o/authorize/',
        clientId: 'iDWxqlTdUNUtGd3MIjxsI8HcICSjsRwHfy1LKvzF',
        redirectUri: 'http://localhost:3000/oauth/callback/onadata/',
        scopes: ['read', 'write'],
        state: 'abc',
        userUri: 'https://stage-api.ona.io/api/v1/user.json'
      }
    };
    expect(getProviderFromOptions(providersObj.onadata)).toEqual(expected);
  });
});
