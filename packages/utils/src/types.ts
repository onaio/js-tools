/** Interface for a generic object */
export interface Dictionary<T = any> {
  [key: string]: T;
}

/** Generic Type for any object to be updated
 *  where T is the base interface and Y is the interface
 * to extend the base
 */
export type UpdateType<T extends any, Y> = T & Y;

/** This interface is meant to be used as the output of a function
 * which has returned an error and no value.
 */
export interface Failure {
  error: Error;
  value: null;
}

/** This interface is meant to be used as the output of a function
 * which has returned an value and no error.
 */
export interface Success<T> {
  error: null;
  value: T;
}

/** This is a generic interface that describes the output (or ... Result) of
 * a function.
 *
 * A function can either return Success, or Failure.  The intention is to make
 * it clear that both Success and Failure must be considered and handled.
 *
 * Inspired by https://gdelgado.ca/type-safe-error-handling-in-typescript.html#title
 */
export type Result<T> = Success<T> | Failure;
