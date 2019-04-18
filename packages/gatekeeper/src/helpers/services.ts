import { authenticateUser } from '@onaio/session-reducer';
import { onadataAuth } from './tests/fixtures';

/** Calls the oAuth provider to get user details */
export async function oauth2Callback(uri: string) {
  return onadataAuth.token.getToken(uri).then(async (oAuthObject: any) => {
    const url = 'https://stage-api.ona.io/api/v1/user.json';
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

    if (!data) {
      throw new Error('oAuth service oauth2Callback failed, data not returned');
    }

    return data;
  });
}

/** This function is used to fetch the user logging in by calling oauth2Callback
 * and then calling authenticateUser to store the user in the Redux store.
 */
export async function fetchUser(someVar: string, dispatch: any) {
  try {
    const apiResponse = await oauth2Callback(someVar);
    const { username, name, email, gravatar, api_token } = apiResponse as any;
    const theUser = {
      email,
      gravatar,
      name,
      username
    };
    dispatch(authenticateUser(api_token, true, theUser));
  } catch (error) {
    // ideally you dont want to throw an error here! You want to notify the user
    throw new Error(error);
  }
}
