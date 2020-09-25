import { Dictionary } from '@onaio/utils';
import React from 'react';
import { Cell } from 'react-table';
import { DrillDownTableProps } from '../helpers/types';
/** only provide defaults for the props that are actionable as part of this HOC */
export declare const defaultDrillDownTableProps: {
  CellComponent: React.ElementType<any>;
  drillDownFilter: (
    props: DrillDownTableProps<Dictionary<any>>,
    parentId: string
  ) => Array<Dictionary<any>>;
  loading: boolean;
  loadingComponent: {
    (props: import('./HelperComponents').SpinnerProps): JSX.Element;
    defaultProps: import('./HelperComponents').SpinnerProps;
  };
  data: Array<{}>;
  identifierField: string;
  parentIdentifierField: string;
  hasChildren: import('./TableJSX').HasChildrenFuncType;
  renderInTopFilterBar?: import('./TableJSX').FilterBarRenderer<{}> | undefined;
  renderInBottomFilterBar?: import('./TableJSX').FilterBarRenderer<{}> | undefined;
  rootParentId: string | null;
  renderNullDataComponent: () => React.ReactNode;
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
    drillDownFilter: (
      props: DrillDownTableProps<Dictionary<any>>,
      parentId: string
    ) => Array<Dictionary<any>>;
    loading: boolean;
    loadingComponent: {
      (props: import('./HelperComponents').SpinnerProps): JSX.Element;
      defaultProps: import('./HelperComponents').SpinnerProps;
    };
    data: Array<{}>;
    identifierField: string;
    parentIdentifierField: string;
    hasChildren: import('./TableJSX').HasChildrenFuncType;
    renderInTopFilterBar?: import('./TableJSX').FilterBarRenderer<{}> | undefined;
    renderInBottomFilterBar?: import('./TableJSX').FilterBarRenderer<{}> | undefined;
    rootParentId: string | null;
    renderNullDataComponent: () => React.ReactNode;
    linkerField?: string | undefined;
    useDrillDown: boolean;
    getTdProps?: ((cell: Cell<{}, any>) => Dictionary<any>) | undefined;
    paginate: boolean;
    resize: boolean;
  };
}
export { DrillDownTable };
