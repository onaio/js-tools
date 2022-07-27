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

export const openSRPSession = {
  authenticated: true,
  extraData: {
    email: null,
    email_verified: false,
    family_name: 'User',
    given_name: 'Demo',
    oAuth2Data: {
      access_token:
        'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHZ0NjX3c0UG9Gd25vbThILXpQMEQ4UTc1ZjZ1LWdHLUJTZV9Xc1QxSkU0In0.eyJleHAiOjE2NTg3MzQyMTcsImlhdCI6MTY1ODczNDE1NywiYXV0aF90aW1lIjoxNjU4NzM0MTUxLCJqdGkiOiJkZmNhNDExOS05NDViLTQ5ZDYtOWI2Mi00OGM1OTcwNWZhMGQiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLXN0YWdlLnNtYXJ0cmVnaXN0ZXIub3JnL2F1dGgvcmVhbG1zL29wZW5zcnAtd2ViLXN0YWdlIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImRiOTAwOTJmLWI5ODMtNGYyNi1iMTI5LWRhZGRhZjAyMzg0ZiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wZW5zcnAtc3RhZ2Utc2VydmVyIiwic2Vzc2lvbl9zdGF0ZSI6Ijk1NjIyZDM3LTE3NTctNDJkMy05ZWRhLWRhOTkxMjExNTNlYSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3dlYi5vbi1wcmVtaXNlLms4cy5zbWFydHJlZ2lzdGVyLm9yZyIsImh0dHBzOi8vb3BlbnNycC5vbi1wcmVtaXNlLms4cy5zbWFydHJlZ2lzdGVyLm9yZyIsImh0dHBzOi8vc3VwZXJzZXQtb2F1dGgtZGVtby5yaXZlcnMub25hbGFicy5vcmciLCJodHRwczovL3dlYi5sYWJzLnNtYXJ0cmVnaXN0ZXIub3JnLyoiLCJodHRwOi8vbG9jYWxob3N0OjkwOTAvKiIsImh0dHBzOi8vemVpci5zbWFydHJlZ2lzdGVyLm9yZy8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwLyoiLCJodHRwOi8vd2ViLnplaXIuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHBzOi8vb3BlbnNycC1zdGFnZS1zZW50aW5lbC5sYWJzLnNtYXJ0cmVnaXN0ZXIub3JnLyoiLCJodHRwczovL3dlYi5vcGVuc3JwLXN0YWdlLnNtYXJ0cmVnaXN0ZXIub3JnIiwiaHR0cHM6Ly9maGlyLmxhYnMuc21hcnRyZWdpc3Rlci5vcmciLCJodHRwczovL29wZW5zcnAtc3RhZ2UubGFicy5zbWFydHJlZ2lzdGVyLm9yZyIsImh0dHBzOi8vd2ViLndlbGxuZXNzcGFzcy1wcmV2aWV3LnNtYXJ0cmVnaXN0ZXIub3JnLyIsImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHBzOi8vb3BlbnNycC1zdGFnZS5zbWFydHJlZ2lzdGVyLm9yZyIsImh0dHA6Ly8xOTIuMTY4LjEwMC4yOjgwODAvKiIsImh0dHBzOi8vd2ViLnplaXIuc21hcnRyZWdpc3Rlci5vcmciLCJodHRwOi8vd2ViLmxhYnMuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHA6Ly8xNzIuMjAuMTI3LjIzMTo5MDkwLyoiLCJodHRwczovL2ZoaXItd2ViLm9wZW5zcnAtc3RhZ2Uuc21hcnRyZWdpc3Rlci5vcmciLCJodHRwOi8vZmhpci5sYWJzLnNtYXJ0cmVnaXN0ZXIub3JnIiwiaHR0cDovL29wZW5zcnAub24tcHJlbWlzZS5rOHMuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHA6Ly9vcGVuc3JwLXN0YWdlLXNlbnRpbmVsLmxhYnMuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHA6Ly9vcGVuc3JwLXN0YWdlLmxhYnMuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHA6Ly93ZWIub24tcHJlbWlzZS5rOHMuc21hcnRyZWdpc3Rlci5vcmciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIk1BTkFHRV9SRVBPUlRTIiwiT1BFTk1SUyIsInJlYWxtLWFkbWluIiwiRURJVF9LRVlDTE9BS19VU0VSUyIsIlZJRVdfS0VZQ0xPQUtfVVNFUlMiLCJQTEFOU19GT1JfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJBTExfRVZFTlRTIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtdXNlcnMiLCJ2aWV3LXVzZXJzIiwicXVlcnktZ3JvdXBzIiwicXVlcnktdXNlcnMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHJlYWQgcHJvZmlsZSB3cml0ZSBlbWFpbCIsInNpZCI6Ijk1NjIyZDM3LTE3NTctNDJkMy05ZWRhLWRhOTkxMjExNTNlYSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkRlbW8gVXNlciIsInByZWZlcnJlZF91c2VybmFtZSI6ImRlbW8iLCJnaXZlbl9uYW1lIjoiRGVtbyIsImZhbWlseV9uYW1lIjoiVXNlciJ9.AhC1rYONG37Er8YUw0OvEM6h3FqaFYFBN845kOZN2bFo8_x3kpaWuZ5qGGxh8LfPqnMsjnpkL4dXD_3E8uTvjBZBFIeLdck2RaYmxoPXK7j0lDnf4ia36oz2TKUVSBDijacNFdmxmVbyeddFcN6ZPluzO9bvgFkIqIEyCwrLLZEnZwsUdUlgfD4V_ebwkOcSH0z69AkQprZSRPksd5CsY8cPqqDYNRhjRBNqvBdcxtlPwv48Mtpau4rs3yucYKahscNolVAkE_FetEI0KenZdYV5g9N3VdneCsjW4DdZkcuZDrKaA6g64gBUyXEptRsL4wYPwup4_G5NU8vrD-L2cA',
      expires_in: 60,
      id_token:
        'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHZ0NjX3c0UG9Gd25vbThILXpQMEQ4UTc1ZjZ1LWdHLUJTZV9Xc1QxSkU0In0.eyJleHAiOjE2NTg3MzQyMTcsImlhdCI6MTY1ODczNDE1NywiYXV0aF90aW1lIjoxNjU4NzM0MTUxLCJqdGkiOiJkNWRjZWMzNS1hZWM2LTQ1N2MtODljMS1hNWQ3ODhjNWY2YjUiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLXN0YWdlLnNtYXJ0cmVnaXN0ZXIub3JnL2F1dGgvcmVhbG1zL29wZW5zcnAtd2ViLXN0YWdlIiwiYXVkIjoib3BlbnNycC1zdGFnZS1zZXJ2ZXIiLCJzdWIiOiJkYjkwMDkyZi1iOTgzLTRmMjYtYjEyOS1kYWRkYWYwMjM4NGYiLCJ0eXAiOiJJRCIsImF6cCI6Im9wZW5zcnAtc3RhZ2Utc2VydmVyIiwic2Vzc2lvbl9zdGF0ZSI6Ijk1NjIyZDM3LTE3NTctNDJkMy05ZWRhLWRhOTkxMjExNTNlYSIsImF0X2hhc2giOiJtMDJpVDVRYzNiNk15UlFUMjYzSWJ3Iiwic2lkIjoiOTU2MjJkMzctMTc1Ny00MmQzLTllZGEtZGE5OTEyMTE1M2VhIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiRGVtbyBVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGVtbyIsImdpdmVuX25hbWUiOiJEZW1vIiwiZmFtaWx5X25hbWUiOiJVc2VyIn0.BhfHH-Dz4pNIdOmIwFjIkOqZd9rXrG5d4MUQf1QkoZ2BPycudG_M1L8bTgWPvvLe5UPwhmRQiIPY_xu5s1q_WkHYBDNA1ly4gS14YZiB6UhcQdQD0c4mLyxUcfh38DuZbOOzSMb-GmApimpwQLvyFVRXim2Oe4-b0lS_urUXAMdF0u4JALp4EjMneThvuNfmpKyaygJlQFytW9E8dibTUvZjotD21iAReYP0BNx6WQwRRp4NUPaavdNUgqTuq7DiCbmv1EF7dEs9e3LUplkScnBswO02YeETxBNvYrLW12mkLg_VnW-HfG0Nlrkv1FgP8_9tj53CiRi9SizRACCp5Q',
      'not-before-policy': 1658476789,
      refresh_expires_at: '2022-07-25T07:32:11.000Z',
      refresh_expires_in: 120,
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjOTUzYTg0OC04YjU4LTQ5ZGMtYjI5Yy1kMjVhMDZjOWUxNjYifQ.eyJleHAiOjE2NTg3MzQyNzcsImlhdCI6MTY1ODczNDE1NywianRpIjoiMzY3NzE1OGEtYTc5ZC00ZmZjLTk2ZTMtODQ3NTY0MWNjM2I5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1zdGFnZS5zbWFydHJlZ2lzdGVyLm9yZy9hdXRoL3JlYWxtcy9vcGVuc3JwLXdlYi1zdGFnZSIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWstc3RhZ2Uuc21hcnRyZWdpc3Rlci5vcmcvYXV0aC9yZWFsbXMvb3BlbnNycC13ZWItc3RhZ2UiLCJzdWIiOiJkYjkwMDkyZi1iOTgzLTRmMjYtYjEyOS1kYWRkYWYwMjM4NGYiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoib3BlbnNycC1zdGFnZS1zZXJ2ZXIiLCJzZXNzaW9uX3N0YXRlIjoiOTU2MjJkMzctMTc1Ny00MmQzLTllZGEtZGE5OTEyMTE1M2VhIiwic2NvcGUiOiJvcGVuaWQgcmVhZCBwcm9maWxlIHdyaXRlIGVtYWlsIiwic2lkIjoiOTU2MjJkMzctMTc1Ny00MmQzLTllZGEtZGE5OTEyMTE1M2VhIn0.yQLxgFm2PpNt5RUkvoFBRRAqyutwdBGhb3JMIrVxXXc',
      scope: 'openid read profile write email',
      session_state: '95622d37-1757-42d3-9eda-da99121153ea',
      token_expires_at: '2022-07-25T07:30:11.000Z',
      token_type: 'Bearer'
    },
    preferred_name: 'Demo User',
    roles: [
      'ROLE_MANAGE_REPORTS',
      'ROLE_OPENMRS',
      'ROLE_realm-admin',
      'ROLE_EDIT_KEYCLOAK_USERS',
      'ROLE_VIEW_KEYCLOAK_USERS',
      'ROLE_PLANS_FOR_USER',
      'ROLE_offline_access',
      'ROLE_uma_authorization',
      'ROLE_ALL_EVENTS'
    ],
    user_id: 'db90092f-b983-4f26-b129-daddaf02384f',
    username: 'demo'
  },
  user: { email: '', gravatar: '', name: '', username: 'demo' }
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

export const opensrpOauthClientData = {
  oAuth2Data: {
    access_token:
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHZ0NjX3c0UG9Gd25vbThILXpQMEQ4UTc1ZjZ1LWdHLUJTZV9Xc1QxSkU0In0.eyJleHAiOjE2NTg3MzQyMTcsImlhdCI6MTY1ODczNDE1NywiYXV0aF90aW1lIjoxNjU4NzM0MTUxLCJqdGkiOiJkZmNhNDExOS05NDViLTQ5ZDYtOWI2Mi00OGM1OTcwNWZhMGQiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLXN0YWdlLnNtYXJ0cmVnaXN0ZXIub3JnL2F1dGgvcmVhbG1zL29wZW5zcnAtd2ViLXN0YWdlIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImRiOTAwOTJmLWI5ODMtNGYyNi1iMTI5LWRhZGRhZjAyMzg0ZiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wZW5zcnAtc3RhZ2Utc2VydmVyIiwic2Vzc2lvbl9zdGF0ZSI6Ijk1NjIyZDM3LTE3NTctNDJkMy05ZWRhLWRhOTkxMjExNTNlYSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3dlYi5vbi1wcmVtaXNlLms4cy5zbWFydHJlZ2lzdGVyLm9yZyIsImh0dHBzOi8vb3BlbnNycC5vbi1wcmVtaXNlLms4cy5zbWFydHJlZ2lzdGVyLm9yZyIsImh0dHBzOi8vc3VwZXJzZXQtb2F1dGgtZGVtby5yaXZlcnMub25hbGFicy5vcmciLCJodHRwczovL3dlYi5sYWJzLnNtYXJ0cmVnaXN0ZXIub3JnLyoiLCJodHRwOi8vbG9jYWxob3N0OjkwOTAvKiIsImh0dHBzOi8vemVpci5zbWFydHJlZ2lzdGVyLm9yZy8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwLyoiLCJodHRwOi8vd2ViLnplaXIuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHBzOi8vb3BlbnNycC1zdGFnZS1zZW50aW5lbC5sYWJzLnNtYXJ0cmVnaXN0ZXIub3JnLyoiLCJodHRwczovL3dlYi5vcGVuc3JwLXN0YWdlLnNtYXJ0cmVnaXN0ZXIub3JnIiwiaHR0cHM6Ly9maGlyLmxhYnMuc21hcnRyZWdpc3Rlci5vcmciLCJodHRwczovL29wZW5zcnAtc3RhZ2UubGFicy5zbWFydHJlZ2lzdGVyLm9yZyIsImh0dHBzOi8vd2ViLndlbGxuZXNzcGFzcy1wcmV2aWV3LnNtYXJ0cmVnaXN0ZXIub3JnLyIsImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHBzOi8vb3BlbnNycC1zdGFnZS5zbWFydHJlZ2lzdGVyLm9yZyIsImh0dHA6Ly8xOTIuMTY4LjEwMC4yOjgwODAvKiIsImh0dHBzOi8vd2ViLnplaXIuc21hcnRyZWdpc3Rlci5vcmciLCJodHRwOi8vd2ViLmxhYnMuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHA6Ly8xNzIuMjAuMTI3LjIzMTo5MDkwLyoiLCJodHRwczovL2ZoaXItd2ViLm9wZW5zcnAtc3RhZ2Uuc21hcnRyZWdpc3Rlci5vcmciLCJodHRwOi8vZmhpci5sYWJzLnNtYXJ0cmVnaXN0ZXIub3JnIiwiaHR0cDovL29wZW5zcnAub24tcHJlbWlzZS5rOHMuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHA6Ly9vcGVuc3JwLXN0YWdlLXNlbnRpbmVsLmxhYnMuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHA6Ly9vcGVuc3JwLXN0YWdlLmxhYnMuc21hcnRyZWdpc3Rlci5vcmcvKiIsImh0dHA6Ly93ZWIub24tcHJlbWlzZS5rOHMuc21hcnRyZWdpc3Rlci5vcmciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIk1BTkFHRV9SRVBPUlRTIiwiT1BFTk1SUyIsInJlYWxtLWFkbWluIiwiRURJVF9LRVlDTE9BS19VU0VSUyIsIlZJRVdfS0VZQ0xPQUtfVVNFUlMiLCJQTEFOU19GT1JfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJBTExfRVZFTlRTIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtdXNlcnMiLCJ2aWV3LXVzZXJzIiwicXVlcnktZ3JvdXBzIiwicXVlcnktdXNlcnMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHJlYWQgcHJvZmlsZSB3cml0ZSBlbWFpbCIsInNpZCI6Ijk1NjIyZDM3LTE3NTctNDJkMy05ZWRhLWRhOTkxMjExNTNlYSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkRlbW8gVXNlciIsInByZWZlcnJlZF91c2VybmFtZSI6ImRlbW8iLCJnaXZlbl9uYW1lIjoiRGVtbyIsImZhbWlseV9uYW1lIjoiVXNlciJ9.AhC1rYONG37Er8YUw0OvEM6h3FqaFYFBN845kOZN2bFo8_x3kpaWuZ5qGGxh8LfPqnMsjnpkL4dXD_3E8uTvjBZBFIeLdck2RaYmxoPXK7j0lDnf4ia36oz2TKUVSBDijacNFdmxmVbyeddFcN6ZPluzO9bvgFkIqIEyCwrLLZEnZwsUdUlgfD4V_ebwkOcSH0z69AkQprZSRPksd5CsY8cPqqDYNRhjRBNqvBdcxtlPwv48Mtpau4rs3yucYKahscNolVAkE_FetEI0KenZdYV5g9N3VdneCsjW4DdZkcuZDrKaA6g64gBUyXEptRsL4wYPwup4_G5NU8vrD-L2cA',
    expires_in: 60,
    refresh_expires_in: 120,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjOTUzYTg0OC04YjU4LTQ5ZGMtYjI5Yy1kMjVhMDZjOWUxNjYifQ.eyJleHAiOjE2NTg3MzQyNzcsImlhdCI6MTY1ODczNDE1NywianRpIjoiMzY3NzE1OGEtYTc5ZC00ZmZjLTk2ZTMtODQ3NTY0MWNjM2I5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1zdGFnZS5zbWFydHJlZ2lzdGVyLm9yZy9hdXRoL3JlYWxtcy9vcGVuc3JwLXdlYi1zdGFnZSIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWstc3RhZ2Uuc21hcnRyZWdpc3Rlci5vcmcvYXV0aC9yZWFsbXMvb3BlbnNycC13ZWItc3RhZ2UiLCJzdWIiOiJkYjkwMDkyZi1iOTgzLTRmMjYtYjEyOS1kYWRkYWYwMjM4NGYiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoib3BlbnNycC1zdGFnZS1zZXJ2ZXIiLCJzZXNzaW9uX3N0YXRlIjoiOTU2MjJkMzctMTc1Ny00MmQzLTllZGEtZGE5OTEyMTE1M2VhIiwic2NvcGUiOiJvcGVuaWQgcmVhZCBwcm9maWxlIHdyaXRlIGVtYWlsIiwic2lkIjoiOTU2MjJkMzctMTc1Ny00MmQzLTllZGEtZGE5OTEyMTE1M2VhIn0.yQLxgFm2PpNt5RUkvoFBRRAqyutwdBGhb3JMIrVxXXc',
    token_type: 'Bearer',
    id_token:
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHZ0NjX3c0UG9Gd25vbThILXpQMEQ4UTc1ZjZ1LWdHLUJTZV9Xc1QxSkU0In0.eyJleHAiOjE2NTg3MzQyMTcsImlhdCI6MTY1ODczNDE1NywiYXV0aF90aW1lIjoxNjU4NzM0MTUxLCJqdGkiOiJkNWRjZWMzNS1hZWM2LTQ1N2MtODljMS1hNWQ3ODhjNWY2YjUiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLXN0YWdlLnNtYXJ0cmVnaXN0ZXIub3JnL2F1dGgvcmVhbG1zL29wZW5zcnAtd2ViLXN0YWdlIiwiYXVkIjoib3BlbnNycC1zdGFnZS1zZXJ2ZXIiLCJzdWIiOiJkYjkwMDkyZi1iOTgzLTRmMjYtYjEyOS1kYWRkYWYwMjM4NGYiLCJ0eXAiOiJJRCIsImF6cCI6Im9wZW5zcnAtc3RhZ2Utc2VydmVyIiwic2Vzc2lvbl9zdGF0ZSI6Ijk1NjIyZDM3LTE3NTctNDJkMy05ZWRhLWRhOTkxMjExNTNlYSIsImF0X2hhc2giOiJtMDJpVDVRYzNiNk15UlFUMjYzSWJ3Iiwic2lkIjoiOTU2MjJkMzctMTc1Ny00MmQzLTllZGEtZGE5OTEyMTE1M2VhIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiRGVtbyBVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGVtbyIsImdpdmVuX25hbWUiOiJEZW1vIiwiZmFtaWx5X25hbWUiOiJVc2VyIn0.BhfHH-Dz4pNIdOmIwFjIkOqZd9rXrG5d4MUQf1QkoZ2BPycudG_M1L8bTgWPvvLe5UPwhmRQiIPY_xu5s1q_WkHYBDNA1ly4gS14YZiB6UhcQdQD0c4mLyxUcfh38DuZbOOzSMb-GmApimpwQLvyFVRXim2Oe4-b0lS_urUXAMdF0u4JALp4EjMneThvuNfmpKyaygJlQFytW9E8dibTUvZjotD21iAReYP0BNx6WQwRRp4NUPaavdNUgqTuq7DiCbmv1EF7dEs9e3LUplkScnBswO02YeETxBNvYrLW12mkLg_VnW-HfG0Nlrkv1FgP8_9tj53CiRi9SizRACCp5Q',
    'not-before-policy': 1658476789,
    session_state: '95622d37-1757-42d3-9eda-da99121153ea',
    scope: 'openid read profile write email'
  }
};
