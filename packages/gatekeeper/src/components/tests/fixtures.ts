export const providers = {
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
