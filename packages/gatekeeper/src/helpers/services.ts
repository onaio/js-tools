import { AuthenticateAction, authenticateUser } from '@onaio/session-reducer';
import ClientOAuth2 from 'client-oauth2';
import { Dispatch } from 'react';
import { ActionCreator } from 'redux';
import { getOnadataUserInfo, UserInfoFnType } from './oauth';
import { ErrorCallback, errorCallback } from './utils';

/** Calls the oAuth provider to get user details
 * @param {string} locationHash - the location hash value that we receive from the oAuth provider
 * @param {string} url - the URL that returns the user information for the provider
 * @param {ClientOAuth2} provider - the Oauth client object for the provider
 * @param {UserInfoFnType} userInfoCallback - function the gets user info from API response
 */
export async function oauth2Callback(
  locationHash: string,
  url: string,
  provider: ClientOAuth2,
  userInfoCallback: UserInfoFnType
) {
  return provider.token.getToken(locationHash).then(async (oAuthObject: any) => {
    const response = await fetch(
      url,
      oAuthObject.sign({
        method: 'GET',
        url
      })
    );

    if (!response.ok) {
      throw new Error(`oAuth service oauth2Callback failed, HTTP status ${response.status}`);
    }

    const data = await response.json();

    return userInfoCallback(data);
  });
}

/** This function is used to fetch the user logging in by calling oauth2Callback
 * and then calling authenticateUser to store the user in the Redux store.
 * @param {string} locationHash - the location hash value that we receive from the oAuth provider
 * @param {string} url - the URL that returns the user information for the provider
 * @param {any} dispatch - the dispatch function that calls the session reducer action creator
 * @param {ClientOAuth2} provider - the Oauth client object for the provider
 * @param {UserInfoFnType} userInfoCallback - function the gets user info from API response
 * @param {ErrorCallback} errorCallbackFn - a function that handles error messages
 */
export async function fetchUser(
  locationHash: string,
  url: string,
  dispatch: Dispatch<any>,
  provider: ClientOAuth2,
  authenticateActionCreator: ActionCreator<AuthenticateAction> = authenticateUser,
  userInfoCallback: UserInfoFnType = getOnadataUserInfo,
  errorCallbackFn: ErrorCallback = errorCallback
) {
  try {
    const userInfo = await oauth2Callback(locationHash, url, provider, userInfoCallback);
    if (userInfo) {
      const { authenticated, user, extraData } = userInfo;
      dispatch(authenticateActionCreator(authenticated, user, extraData));
    } else {
      errorCallbackFn('Something went wrong');
    }
  } catch (error) {
    errorCallbackFn(error.message);
  }
}
