import { Dictionary } from '@onaio/utils';
import React from 'react';
import { Cell } from 'react-table';
import { TableJSXProps } from './TableJSX';
/** describes props for the DrillDownTable component */
export interface DrillDownTableProps<D extends object>
  extends Omit<TableJSXProps<D>, 'fetchData' | 'parentNodes'> {
  extraCellProps?: Dictionary /** props to be given to CellComponent */;
  CellComponent: React.ElementType /** The component used to render the cell that has the drill down */;
  loading: boolean /** if loading */;
  loadingComponent: React.ElementType /** custom component to show whilst loading is true */;
}
/** only provide defaults for the props that are actionable as part of this HOC */
export declare const defaultDrillDownTableProps: {
  CellComponent: React.ElementType<any>;
  loading: boolean;
  loadingComponent: {
    (props: import('./HelperComponents').SpinnerProps): JSX.Element;
    defaultProps: import('./HelperComponents').SpinnerProps;
  };
  data: Array<{}>;
  hasChildren: import('./TableJSX').HasChildrenFuncType;
  identifierField: string;
  parentIdentifierField: string;
  renderInTopFilterBar?: import('./TableJSX').FilterBarRenderer<{}> | undefined;
  renderInBottomFilterBar?: import('./TableJSX').FilterBarRenderer<{}> | undefined;
  rootParentId: string | null;
  nullDataComponent: React.ElementType<any>;
  linkerField?: string | undefined;
  useDrillDown: boolean;
  getTdProps?: ((cell: Cell<{}, any>) => Dictionary<any>) | undefined;
  paginate: boolean;
  resize: boolean;
};
/** HOC component; wraps around and controls a component that makes use of react-table hooks
 * its main goal is to filter data based on set current parent id  and pass it to controlled presentational component
 */
declare function DrillDownTable<D extends object>(props: DrillDownTableProps<D>): JSX.Element;
declare namespace DrillDownTable {
  var defaultProps: {
    CellComponent: React.ElementType<any>;
    loading: boolean;
    loadingComponent: {
      (props: import('./HelperComponents').SpinnerProps): JSX.Element;
      defaultProps: import('./HelperComponents').SpinnerProps;
    };
    data: Array<{}>;
    hasChildren: import('./TableJSX').HasChildrenFuncType;
    identifierField: string;
    parentIdentifierField: string;
    renderInTopFilterBar?: import('./TableJSX').FilterBarRenderer<{}> | undefined;
    renderInBottomFilterBar?: import('./TableJSX').FilterBarRenderer<{}> | undefined;
    rootParentId: string | null;
    nullDataComponent: React.ElementType<any>;
    linkerField?: string | undefined;
    useDrillDown: boolean;
    getTdProps?: ((cell: Cell<{}, any>) => Dictionary<any>) | undefined;
    paginate: boolean;
    resize: boolean;
  };
}
export { DrillDownTable };
