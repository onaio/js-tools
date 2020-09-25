import { Dictionary } from '@onaio/utils';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  Cell,
  Column,
  TableState,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseSortByColumnOptions,
  UseSortByInstanceProps,
  UseSortByState,
  UseTableInstanceProps
} from 'react-table';
/** Type definition for hasChildrenFunc */
export declare type HasChildrenFuncType = <D extends object>(
  cellObject: Cell<D>,
  parentIdList: number[] | string[],
  idField: string | number,
  fullData: D[]
) => boolean;
/** Check if a Cell  is part of a row whose data entry can be considered to have children */
export declare function hasChildrenFunc<D extends object>(
  cellObject: Cell<D>,
  parentIdList: Array<number | string>,
  idField?: string | number
): boolean;
/** the actual table instance returned from UseTable() after including usePagination and useSortBy hooks */
export interface DrillDownInstanceProps<T extends object>
  extends Omit<UseTableInstanceProps<T>, 'state'>,
    UsePaginationInstanceProps<T>,
    UseSortByInstanceProps<T> {
  state: TableState<T> & UsePaginationState<T> & UseSortByState<T>;
}
/** props for render Prop used to render filters section */
export interface RenderFiltersInBarOptions<T extends object> extends DrillDownInstanceProps<T> {
  setRowHeight: Dispatch<SetStateAction<string>>;
}
/** props for render prop function that render filter section */
export declare type FilterBarRenderer<TData extends object> = (
  prop: RenderFiltersInBarOptions<TData>
) => ReactNode;
export declare type DrillDownColumn<T extends object> = Column<T> &
  UseSortByColumnOptions<T> &
  UseResizeColumnsColumnOptions<T> &
  UseSortByColumnOptions<T>;
/** describes props for the underlying Table component : TData is the type of data to be rendered in table */
export interface TableJSXProps<TData extends object> {
  columns: Array<DrillDownColumn<TData>> /** columns as per react-table format */;
  data: TData[] /** array of data */;
  fetchData: (
    options: Dictionary
  ) => void /** function that dynamically changes the chunk of data given to react-table */;
  identifierField: string /** unique identifier for a row */;
  parentNodes: Array<string | number> /** array of identifiers for all rows that have children */;
  parentIdentifierField: string /** the field to identify a row's parent */;
  hasChildren: HasChildrenFuncType /** function to check if a row of data has children or not */;
  renderInTopFilterBar?: FilterBarRenderer<
    TData
  > /** add a section immediately above table for filter components */;
  renderInBottomFilterBar?: FilterBarRenderer<
    TData
  > /** add a section immediately above table for filter components */;
  rootParentId:
    | string
    | null /** the value of parentIdentifierField for rows that have not parent */;
  renderNullDataComponent: () => ReactNode /** component to render if data is empty array */;
  linkerField?: string /** the field to be used to drill down the data */;
  useDrillDown: boolean /** whether component can act as a normal table */;
  getTdProps?: (cell: Cell<TData>) => Dictionary;
  paginate: boolean;
  resize: boolean;
}
/** default props for TableJSX */
export declare const defaultTableProps: Omit<
  TableJSXProps<{}>,
  'columns' | 'fetchData' | 'parentNodes'
>;
/** the underlying Table component
 * its separate since we want to control some of its aspects, specifically pagination
 */
declare function Table<D extends object>(props: TableJSXProps<D>): JSX.Element;
declare namespace Table {
  var defaultProps: Pick<
    TableJSXProps<{}>,
    | 'data'
    | 'identifierField'
    | 'parentIdentifierField'
    | 'hasChildren'
    | 'renderInTopFilterBar'
    | 'renderInBottomFilterBar'
    | 'rootParentId'
    | 'renderNullDataComponent'
    | 'linkerField'
    | 'useDrillDown'
    | 'getTdProps'
    | 'paginate'
    | 'resize'
  >;
}
export { Table };
