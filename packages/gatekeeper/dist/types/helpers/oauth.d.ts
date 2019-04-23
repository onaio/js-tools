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
export declare function getProviderFromOptions(options: OauthOptions): ClientOAuth2;
/** Type definition for userInfo functions  */
export declare type UserInfoFnType = (obj: { [key: string]: any }) => SessionState | void;
/** Function to get onadata user info from api response object
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export declare function getOnadataUserInfo(apiResponse: {
  [key: string]: any;
}): SessionState | void;
