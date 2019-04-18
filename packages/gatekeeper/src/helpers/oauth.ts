import ClientOAuth2 from 'client-oauth2';

export const onadataAuth = new ClientOAuth2({
  accessTokenUri: 'https://stage-api.ona.io/o/token/',
  authorizationUri: 'https://stage-api.ona.io/o/authorize/',
  clientId: 'iDWxqlTdUNUtGd3MIjxsI8HcICSjsRwHfy1LKvzF',
  redirectUri: 'http://localhost:3000/oauth/callback/onadata/',
  scopes: ['read', 'write'],
  state: 'abc'
});
