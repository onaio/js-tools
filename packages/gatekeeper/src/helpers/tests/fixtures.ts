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

export const oAuth2Data = {
  access_token: 'iLoveOov',
  expires_in: '36000',
  scope: 'read write',
  state: 'abc',
  token_type: 'Bearer'
};

export const finalExtraData = {
  api_token: 'the api token',
  city: '',
  country: '',
  email: 'mosh@example.com',
  gravatar:
    'https://secure.gravatar.com/avatar/ae22ab897231db07205bd5d00e64cbbf?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
  name: 'mosh',
  oAuth2Data,
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

export const openSRPResponse = {
  preferredName: 'mosh',
  roles: ['Privilege Level: Full'],
  preferred_username: 'moshthepitt'
};

export const openSRPFinalData = {
  ...openSRPResponse,
  oAuth2Data: {
    ...oAuth2Data,
    roles: ['view_keycloak_users'],
    refresh_expires_in: '2592000'
  }
};

export const openSRPSession = {
  authenticated: true,
  extraData: {
    email: null,
    email_verified: undefined,
    family_name: undefined,
    given_name: undefined,
    oAuth2Data: {
      access_token: 'iLoveOov',
      expires_in: '36000',
      refresh_expires_at: '2020-01-31T00:00:00.000Z',
      refresh_expires_in: '2592000',
      roles: ['view_keycloak_users'],
      scope: 'read write',
      state: 'abc',
      token_expires_at: '2020-01-01T10:00:00.000Z',
      token_type: 'Bearer'
    },
    organization: undefined,
    preferred_name: undefined,
    roles: [],
    user_id: undefined,
    username: 'moshthepitt'
  },
  user: { email: '', gravatar: '', name: '', username: 'moshthepitt' }
};

export const expressAPIResponse = {
  gatekeeper: {
    result: {
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
    },
    success: true
  },
  session: {
    authenticated: true,
    extraData: {
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
    },
    user: {
      email: '',
      gravatar: '',
      name: '',
      username: 'superset-user'
    }
  }
};

export const ImplicitOAuthData = {
  extraData: {
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
  },
  user: {
    email: 'mosh@example.com',
    gravatar:
      'https://secure.gravatar.com/avatar/ae22ab897231db07205bd5d00e64cbbf?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
    name: 'mosh',
    username: 'moshthepitt'
  }
};

export const OAuthExtradata = {
  authenticated: true,
  ...ImplicitOAuthData
};
