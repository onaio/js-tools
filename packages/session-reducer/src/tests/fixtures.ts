/** An example of a user from Onadata */
export const onadataUser = {
  api_token: 'the api token',
  city: '',
  country: '',
  email: 'mosh@example.com',
  gravatar:
    'https://secure.gravatar.com/avatar/ae22ab897231db07205bd5d00e64cbbf?d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png&s=60',
  name: 'mosh',
  oAuth2Data: {
    access_token: 'hunter2',
    expires_in: '3599',
    state: 'opensrp',
    token_type: 'bearer'
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

/** updated extraData object with admin user role details */
export const adminUserRole = {
  role: {
    permissions: {
      name: 'Admin'
    },
    role_id: 1,
    role_name: 'Administrator'
  }
};

/** updated extraData object with public user role details */
export const publicUserRole = {
  role: {
    permissions: {
      name: 'Public'
    },
    role_id: 2,
    role_name: 'Public'
  }
};

/** updated pemissions object in extraData object */
export const Permissions = {
  role: {
    permissions: {
      name: 'Mel'
    }
  }
};

/** Generic user object compatible with the session store */
export const sessionUser = {
  email: onadataUser.email,
  gravatar: onadataUser.gravatar,
  name: onadataUser.name,
  username: onadataUser.username
};

export const firstUpdateExtraData = Object.assign({}, onadataUser, publicUserRole);
export const secondUpdateExtraData = Object.assign({}, firstUpdateExtraData, adminUserRole);
export const finalUpdateExtraData = Object.assign({}, secondUpdateExtraData, Permissions);
