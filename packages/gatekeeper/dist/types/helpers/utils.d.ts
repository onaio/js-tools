/** Type definition for error callback function  */
export declare type ErrorCallback = (e: string) => string | void;
/** Error callback function
 * @param {string} error - the error message
 */
export declare function errorCallback(error: string): void;
/**
 * Open another window and navigate to the logout URL.
 * @param {string} logoutURL URL string representing the auth server logout URL endpoint.
 * This function takes the approach of opening a new window and navigating to the logout
 * url of the authentication server in order to go around the browser's CORS policy.
 */
export declare function logoutFromAuthServer(logoutURL: string): void;
