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

export const finalExtraData = {
  api_token: 'the api token',
  city: '',
  country: '',
  email: 'mosh@example.com',
  gravatar:
    'https://secure.gravatar.com/avatar/ae22ab897231db07205bd5d00e64cbbf?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
  name: 'mosh',
  oAuth2Data: {
    access_token: 'iLoveOov',
    expires_in: '36000',
    scope: 'read write',
    state: 'abc',
    token_type: 'Bearer'
  },
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
  clientId: 'hunter2',
  redirectUri: 'https://example.com/oauth/callback/onadata/',
  scopes: ['read', 'write'],
  state: 'abc'
});

export const onadataSession = {
  authenticated: true,
  extraData: finalExtraData,
  user: {
    email: onadataUser.email,
    gravatar: onadataUser.gravatar,
    name: onadataUser.name,
    username: onadataUser.username
  }
};

export const onadataSessionWithOauthData = {
  authenticated: true,
  extraData: finalExtraData,
  user: {
    email: onadataUser.email,
    gravatar: onadataUser.gravatar,
    name: onadataUser.name,
    username: onadataUser.username
  }
};
