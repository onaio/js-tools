import { Dictionary } from '@onaio/utils';
import { DrillDownColumn } from '../components/TableJSX';
import { DrillDownTableProps } from './types';

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

export const defaultDrillDownFilter = (
  props: DrillDownTableProps<Dictionary>,
  parentId: string
) => {
  const filterByLevel = props.data.filter((row: Dictionary) => {
    return row[props.parentIdentifierField] === parentId;
  });
  return filterByLevel;
};
