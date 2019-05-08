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
  const { username } = apiResponse;
  const user = {
    email: apiResponse.email || '',
    gravatar: apiResponse.gravatar || '',
    name: apiResponse.name || '',
    username
  };
  const extraData = apiResponse;
  return {
    authenticated: true,
    extraData,
    user
  };
}

/** Function to get OpenSRP user info from api response object
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export function getOpenSRPUserInfo(apiResponse: { [key: string]: any }): SessionState {
  if (!apiResponse.userName) {
    throw new Error(OAUTH2_CALLBACK_ERROR);
  }
  const user = {
    email: '',
    gravatar: '',
    name: '',
    username: apiResponse.userName
  };
  const extraData = apiResponse;
  return {
    authenticated: true,
    extraData,
    user
  };
}
