import { Column } from 'react-table';

/** Takes an object and returns columns that are compatible with react-table
 * derived from the object's keys
 */
export function columnsFromObjects<D extends object>(items: D[]): Array<Column<D>> {
  if (items.length < 1) {
    return [];
  }
  return (Object.keys(items[0]).map(k => ({ Header: k, accessor: k })) as unknown) as Array<
    Column<D>
  >;
}
