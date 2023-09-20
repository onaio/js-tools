import { AuthenticateAction, LogOutAction } from '@onaio/session-reducer';
import ClientOAuth2 from 'client-oauth2';
import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { AuthenticationProgressAction, RecordAction } from '../ducks/gatekeeper';
import { UserInfoFnType } from './oauth';
import { ErrorCallback } from './utils';
/** allowed http methods */
type HTTPMethod = 'GET' | 'POST' | 'get' | 'post';
/** Calls the oAuth provider to get user details
 * @param {URL} urlObject - the URL object defined by the location hash and href
 * @param {string} url - the URL that returns the user information for the provider
 * @param {ClientOAuth2} provider - the Oauth client object for the provider
 * @param {UserInfoFnType} userInfoCallback - function the gets user info from API response
 * @param {string} method - the HTTP method to use
 */
export declare function oauth2Callback(
  urlObject: URL,
  url: string,
  provider: ClientOAuth2,
  userInfoCallback: UserInfoFnType,
  method?: HTTPMethod
): Promise<void | import('@onaio/session-reducer').SessionState>;
/** This function is used to fetch the user logging in by calling oauth2Callback
 * and then calling authenticateUser to store the user in the Redux store.
 * @param {URL} urlObject - the URL object defined by the location hash and href
 * @param {string} url - the URL that returns the user information for the provider
 * @param {ClientOAuth2} provider - the Oauth client object for the provider
 * @param {ActionCreator<AuthenticateAction>} authenticateActionCreator - the authenticate action creator function
 * @param {ActionCreator<RecordAction>} recordResultActionCreator - the recordResult action creator function
 * @param {UserInfoFnType} userInfoCallback - function the gets user info from API response
 * @param {ErrorCallback} errorCallbackFn - a function that handles error messages
 * @param {string} method - the HTTP method to use
 */
export declare function fetchUser(
  urlObject: URL,
  resourceUrl: string,
  provider: ClientOAuth2,
  authenticateActionCreator?: ActionCreator<AuthenticateAction>,
  recordResultActionCreator?: ActionCreator<RecordAction>,
  userInfoCallback?: UserInfoFnType,
  errorCallbackFn?: ErrorCallback,
  method?: HTTPMethod
): Promise<void>;
/** describes options to be passed to fetchState as second argument */
interface FetchStateActionCreators {
  authenticateActionCreator?: ActionCreator<AuthenticateAction>;
  recordResultActionCreator?: ActionCreator<RecordAction>;
  authenticationProgressCreator?: ActionCreator<AuthenticationProgressAction>;
  errorCallbackFn?: ErrorCallback;
  logoutActionCreator?: ActionCreator<LogOutAction>;
}
/** fetches session info from provided url
 * @params {string} url - points to location of the sessions
 * @params {options} - actionCreators
 */
export declare const fetchState: (
  url: string,
  {
    authenticateActionCreator,
    recordResultActionCreator,
    authenticationProgressCreator,
    errorCallbackFn,
    logoutActionCreator
  }: FetchStateActionCreators
) => Promise<void>;
/** describes options to be passed to refreshToken as third argument */
interface RefreshTokenActionCreators {
  authenticateActionCreator?: ActionCreator<AuthenticateAction>;
  recordResultActionCreator?: ActionCreator<RecordAction>;
  errorCallbackFn?: ErrorCallback;
}
/**
 * call express API to Refresh token and return new token
 * @param {string} url - token refresh endpoint
 * @param {Dispatch<AnyAction>} dispatch - dispatch action
 * @param {RefreshTokenActionCreators} options - optional params
 */
export declare const refreshToken: (
  url: string,
  dispatch: Dispatch<AnyAction>,
  {
    authenticateActionCreator,
    errorCallbackFn,
    recordResultActionCreator
  }: RefreshTokenActionCreators
) => Promise<any>;
export {};
