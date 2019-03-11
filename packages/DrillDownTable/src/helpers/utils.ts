/** Utilities */

/** Takes an object and returns columns that are compatible with react-table
 * derived from the object's keys
 */
export function columnsFromObject(item: object) {
  const columnsList = [];
  for (const field of Object.keys(item)) {
    const columnItem = {
      Header: field,
      accessor: field
    };
    columnsList.push(columnItem);
  }
  return columnsList;
}

/** Interface for an object that is allowed to have any property */
export interface FlexObject {
  [key: string]: any;
}
