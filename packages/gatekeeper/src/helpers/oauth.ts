import { SessionState } from '@onaio/session-reducer';
import ClientOAuth2, { Options } from 'client-oauth2';

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

/** Function to get onadata user info from api reponse object
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export function getOnadataUserInfo(apiResponse: { [key: string]: any }): SessionState | void {
  if (!apiResponse.username || !apiResponse.api_token) {
    throw new Error('oAuth service oauth2Callback failed, data not returned');
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
