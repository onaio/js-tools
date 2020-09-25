/// <reference types="react" />
import { Dictionary } from '@onaio/utils';
import { TableJSXProps } from '..';
export declare type DrillDownFilter<D extends object> = (
  props: DrillDownTableProps<D>,
  parentId: string
) => D[];
/** describes props for the DrillDownTable component */
export interface DrillDownTableProps<D extends object>
  extends Omit<TableJSXProps<D>, 'fetchData' | 'parentNodes' | 'fullData'> {
  extraCellProps?: Dictionary /** props to be given to CellComponent */;
  CellComponent: React.ElementType /** The component used to render the cell that has the drill down */;
  loading: boolean /** if loading */;
  loadingComponent: React.ElementType /** custom component to show whilst loading is true */;
  drillDownFilter: DrillDownFilter<D>;
}
