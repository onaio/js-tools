import { DEFAULT_LOGOUT_DELAY } from './constants';

/** Type definition for error callback function  */
export type ErrorCallback = (e: string) => string | void;

/** Error callback function
 * @param {string} error - the error message
 */
export function errorCallback(error: string) {
  throw new Error(error);
}

/**
 * Open another window and navigate to the logout URL.
 * @param {string} logoutURL URL string representing the auth server logout URL endpoint.
 * This function takes the approach of opening a new window and navigating to the logout
 * url of the authentication server in order to go around the browser's CORS policy.
 */
export function logoutFromAuthServer(logoutURL: string) {
  const logoutWindow: Window | null = window.open(logoutURL);
  const timer: NodeJS.Timeout = setInterval(() => {
    if (logoutWindow) {
      logoutWindow.close();
    }
    clearInterval(timer);
  }, DEFAULT_LOGOUT_DELAY);
}
