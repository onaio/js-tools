/* eslint-disable camelcase */
import { SessionState } from '@onaio/session-reducer';
import ClientOAuth2, { Options } from 'client-oauth2';
import { OAUTH2_CALLBACK_ERROR } from './constants';

/** interface for oAuth options */
export interface OauthOptions extends Options {
  userUri: string;
}

/** interface for providers object */
export interface Providers {
  [key: string]: OauthOptions;
}

/** get oAuth provider from oAuthOptions
 * @param {OauthOptions} options - the options for the oAuth provider
 */
export function getProviderFromOptions(options: OauthOptions) {
  const { accessTokenUri, authorizationUri, clientId, redirectUri, scopes, state } = options;
  return new ClientOAuth2({
    accessTokenUri,
    authorizationUri,
    clientId,
    redirectUri,
    scopes,
    state
  });
}

/** Type definition for userInfo functions  */
export type UserInfoFnType = (obj: { [key: string]: any }) => SessionState | void;

/** Function to get onadata user info from api response object
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export function getOnadataUserInfo(apiResponse: { [key: string]: any }): SessionState | void {
  if (!apiResponse.username || !apiResponse.api_token) {
    throw new Error(OAUTH2_CALLBACK_ERROR);
  }
  return {
    authenticated: true,
    extraData: apiResponse,
    user: {
      email: apiResponse.email || '',
      gravatar: apiResponse.gravatar || '',
      name: apiResponse.name || '',
      username: apiResponse.username
    }
  };
}

/**
 * Takes current time and adds passes second
 * Incase passed seconds are invalid it returns null
 * @param {number} seconds - number of seconds
 */
const addSecToCurrentTime = (seconds: number) => {
  const date = new Date(Date.now());
  return !isNaN(Number(seconds))
    ? new Date(date.setSeconds(date.getSeconds() + Number(seconds))).toISOString()
    : null;
};

/** Function to get OpenSRP user info from api response object
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export function getOpenSRPUserInfo(apiRes: { [key: string]: any }): SessionState {
  const {
    email_verified,
    oAuth2Data,
    given_name,
    family_name,
    preferred_username,
    realm_access,
    sub,
    name,
    organization
  } = apiRes;
  const apiResponse = {
    roles: (realm_access?.roles ?? []).map((role: string) => `ROLE_${role}`),
    email: null,
    username: preferred_username,
    user_id: sub,
    preferred_name: name,
    family_name,
    given_name,
    email_verified,
    oAuth2Data,
    organization
  };
  if (!apiResponse.username) {
    throw new Error(OAUTH2_CALLBACK_ERROR);
  }
  let responseCopy = { ...apiResponse };
  if (apiResponse.oAuth2Data) {
    const { expires_in, refresh_expires_in } = apiResponse.oAuth2Data;
    const tokenExpiryTime = addSecToCurrentTime(expires_in);
    const refreshExpiryTime = addSecToCurrentTime(refresh_expires_in);
    responseCopy = {
      ...responseCopy,
      oAuth2Data: {
        ...apiResponse.oAuth2Data,
        ...(tokenExpiryTime && { token_expires_at: tokenExpiryTime }),
        ...(refreshExpiryTime && { refresh_expires_at: refreshExpiryTime })
      }
    };
  }
  return {
    authenticated: true,
    extraData: responseCopy,
    user: {
      email: '',
      gravatar: '',
      name: '',
      username: apiResponse.username
    }
  };
}
