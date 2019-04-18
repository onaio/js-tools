import ClientOAuth2 from 'client-oauth2';

/** An example of a user from Onadata */
export const onadataUser = {
  api_token: 'the api token',
  city: '',
  country: '',
  email: 'mosh@example.com',
  gravatar:
    'https://secure.gravatar.com/avatar/ae22ab897231db07205bd5d00e64cbbf?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
  name: 'mosh',
  organization: '',
  require_auth: true,
  temp_token: 'the temp token',
  twitter: '',
  url: 'https://stage-api.ona.io/api/v1/profiles/moshthepitt',
  user: 'https://stage-api.ona.io/api/v1/users/moshthepitt',
  username: 'moshthepitt',
  website: ''
};

/** Onadata oAuth provider */
export const onadataAuth = new ClientOAuth2({
  accessTokenUri: 'https://stage-api.ona.io/o/token/',
  authorizationUri: 'https://stage-api.ona.io/o/authorize/',
  clientId: 'iDWxqlTdUNUtGd3MIjxsI8HcICSjsRwHfy1LKvzF',
  redirectUri: 'http://localhost:3000/oauth/callback/onadata/',
  scopes: ['read', 'write'],
  state: 'abc'
});
