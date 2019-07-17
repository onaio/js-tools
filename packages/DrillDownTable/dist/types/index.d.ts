import React from 'react';
import { CellInfo, RowInfo, TableProps } from 'react-table';
import './DrillDownTable.css';
import DropDownCell, { DropDownCellProps } from './helpers/DropDownCell';
import { FlexObject } from './helpers/utils';
import WithHeaders, { getColumns } from './WithHeaders';
/** Type definition for hasChildrenFunc */
export declare type hasChildrenFuncType = (
  currentObject: RowInfo | CellInfo,
  parentIdList: number[] | string[],
  idField: string | number
) => boolean;
/** Check if a row of data has children */
export declare function hasChildrenFunc(
  currentObject: RowInfo | CellInfo,
  parentIdList: number[] | string[],
  idField?: string | number
): boolean;
/** Interface to define props of Drill down table */
export interface DrillDownProps<T> extends Partial<TableProps<T>> {
  CellComponent: React.ElementType /** The component used to render the cell that has the drill down */;
  extraCellProps?: FlexObject /** props to be given to CellComponent */;
  hasChildren?: hasChildrenFuncType /** function to check if a row of data has children or not */;
  identifierField?: string /** unique identifier for a row */;
  linkerField?: string /** the field to be used to drill down the data */;
  parentIdentifierField?: string /** the field to identify a row's parent */;
  rootParentId?: any /** the value of parentIdentifierField for rows that have not parent */;
  shouldUseEffect?: boolean /** should we use useEffect */;
  useDrillDownTrProps?: boolean /** whether to use drillDownTrProps */;
}
/** A Higher order component that adds drill-down capability to render
 * hierarchical data in tables that allow you to move from the highest level to
 * the lowest, nad back with maximum flexibility.
 */
declare function DrillDownTable<T>(props: Partial<DrillDownProps<T>>): JSX.Element;
declare namespace DrillDownTable {
  var defaultProps: {
    CellComponent: React.ElementType<any>;
    hasChildren: typeof hasChildrenFunc;
    identifierField: string;
    linkerField: string;
    parentIdentifierField: string;
    rootParentId: null;
    shouldUseEffect: boolean;
    useDrillDownTrProps: boolean;
  };
}
export default DrillDownTable;
export { WithHeaders, getColumns, DropDownCell, DropDownCellProps };
