/** Utilities */
/** Takes an object and returns columns that are compatible with react-table
 * derived from the object's keys
 */
export declare function columnsFromObject(
  item: object
): Array<{
  Header: string;
  accessor: string;
}>;
/** Interface for an object that is allowed to have any property */
export interface FlexObject {
  [key: string]: any;
}
