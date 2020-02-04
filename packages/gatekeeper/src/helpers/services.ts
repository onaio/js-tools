import {
  AuthenticateAction,
  authenticateUser,
  LogOutAction,
  logOutUser
} from '@onaio/session-reducer';
import ClientOAuth2 from 'client-oauth2';
import { Action } from 'history';
import { ActionCreator } from 'redux';
import {
  authenticationProgress,
  AuthenticationProgressAction,
  RecordAction,
  recordResult
} from '../ducks/gatekeeper';
import { GENERIC_ERROR, OAUTH2_HTTP_ERROR } from './constants';
import { getOnadataUserInfo, UserInfoFnType } from './oauth';
import { ErrorCallback, errorCallback } from './utils';

/** allowed http methods */
type HTTPMethod = 'GET' | 'POST' | 'get' | 'post';

/** Calls the oAuth provider to get user details
 * @param {string} locationHash - the location hash value that we receive from the oAuth provider
 * @param {string} url - the URL that returns the user information for the provider
 * @param {ClientOAuth2} provider - the Oauth client object for the provider
 * @param {UserInfoFnType} userInfoCallback - function the gets user info from API response
 * @param {string} method - the HTTP method to use
 */
export async function oauth2Callback(
  locationHash: string,
  url: string,
  provider: ClientOAuth2,
  userInfoCallback: UserInfoFnType,
  method: HTTPMethod = 'GET'
) {
  return provider.token.getToken(locationHash).then(async (oAuthObject: any) => {
    const response = await fetch(
      url,
      oAuthObject.sign({
        method,
        url
      })
    );

    if (!response.ok) {
      throw new Error(`${OAUTH2_HTTP_ERROR} ${response.status}`);
    }

    const data = await response.json();

    /** Add Oauth2 stuff */
    data.oAuth2Data = oAuthObject.data;

    return userInfoCallback(data);
  });
}

/** This function is used to fetch the user logging in by calling oauth2Callback
 * and then calling authenticateUser to store the user in the Redux store.
 * @param {string} locationHash - the location hash value that we receive from the oAuth provider
 * @param {string} url - the URL that returns the user information for the provider
 * @param {ClientOAuth2} provider - the Oauth client object for the provider
 * @param {ActionCreator<AuthenticateAction>} authenticateActionCreator - the authenticate action creator function
 * @param {ActionCreator<RecordAction>} recordResultActionCreator - the recordResult action creator function
 * @param {UserInfoFnType} userInfoCallback - function the gets user info from API response
 * @param {ErrorCallback} errorCallbackFn - a function that handles error messages
 * @param {string} method - the HTTP method to use
 */
export async function fetchUser(
  locationHash: string,
  url: string,
  provider: ClientOAuth2,
  authenticateActionCreator: ActionCreator<AuthenticateAction> = authenticateUser,
  recordResultActionCreator: ActionCreator<RecordAction> = recordResult,
  userInfoCallback: UserInfoFnType = getOnadataUserInfo,
  errorCallbackFn: ErrorCallback = errorCallback,
  method: HTTPMethod = 'GET'
) {
  try {
    const responseInfo = await oauth2Callback(
      locationHash,
      url,
      provider,
      userInfoCallback,
      method
    );
    if (responseInfo) {
      const { authenticated, user, extraData } = responseInfo;
      authenticateActionCreator(authenticated, user, extraData);
      recordResultActionCreator(true, extraData);
    } else {
      recordResultActionCreator(false, { error: GENERIC_ERROR });
      errorCallbackFn(GENERIC_ERROR);
    }
  } catch (error) {
    recordResultActionCreator(false, { error });
    errorCallbackFn(error.message);
  }
}

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
export const fetchState = async (
  url: string,
  {
    authenticateActionCreator = authenticateUser,
    recordResultActionCreator = recordResult,
    authenticationProgressCreator = authenticationProgress,
    errorCallbackFn = errorCallback,
    logoutActionCreator = logOutUser
  }: FetchStateActionCreators
) => {
  authenticationProgressCreator(true);
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        authenticationProgressCreator(false);
        throw new Error('fetching state failed');
      }
    })
    .then(data => {
      const { session } = data;
      if (!session) {
        logoutActionCreator();
        throw new Error('User is logged out');
      }
      const { authenticated, user, extraData } = session;
      authenticateActionCreator(authenticated, user, extraData);
      recordResultActionCreator(true, extraData);
      authenticationProgressCreator(false);
    })
    .catch(err => {
      recordResultActionCreator(false, { err });
      authenticationProgressCreator(false);
      errorCallbackFn(err);
    });
};
