/** Interface for a generic object */
export interface Dictionary<T = any> {
  [key: string]: T;
}

/** Generic Type for any object to be updated
 *  where T is the base interface and Y is the interface
 * to extend the base
 */
export type UpdateType<T extends any, Y> = T & Y;
