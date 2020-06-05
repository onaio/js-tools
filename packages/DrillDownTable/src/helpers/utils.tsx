import { DrillDownColumn } from '../components/TableJSX';

/** Takes an object and returns columns that are compatible with react-table
 * derived from the object's keys
 */
export function columnsFromObjects<D extends object>(items: D[]): Array<DrillDownColumn<D>> {
  if (items.length < 1) {
    return [];
  }
  return (Object.keys(items[0]).map(k => ({ Header: k, accessor: k })) as unknown) as Array<
    DrillDownColumn<D>
  >;
}
