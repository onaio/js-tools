import { SessionState } from '@onaio/session-reducer';
import ClientOAuth2, { Options } from 'client-oauth2';
/** interface for oAuth options */
export interface OauthOptions extends Options {
  userUri: string;
}
export type UnixTimestamp = number;
export interface OpensrpKeycloakTokenClaims {
  exp: UnixTimestamp;
  iat: UnixTimestamp;
  auth_time: UnixTimestamp;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    'realm-management': {
      roles: string[];
    };
    account: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  email_verified: false;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
}
export interface RawOpensrpUserInfo {
  oAuth2Data: Record<string, any>;
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
export type UserInfoFnType = (obj: { [key: string]: any }) => SessionState | void;
/** Function to get onadata user info from api response object
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export declare function getOnadataUserInfo(apiResponse: {
  [key: string]: any;
}): SessionState | void;
/** Function to get OpenSRP user info from api response object
 * @param {RawOpensrpUserInfo} apiResponse - the API response object
 */
export declare function getOpenSRPUserInfo(apiRes: RawOpensrpUserInfo): SessionState;
