/** Type definition for error callback function  */
export type ErrorCallback = (e: string) => string | void;

/** Error callback function
 * @param {string} error - the error message
 */
export function errorCallback(error: string) {
  throw new Error(error);
}
