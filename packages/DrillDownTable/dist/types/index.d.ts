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
  CellComponent: React.ElementType;
  extraCellProps?: FlexObject;
  hasChildren?: hasChildrenFuncType;
  identifierField?: string;
  linkerField?: string;
  parentIdentifierField?: string;
  rootParentId?: any;
  useDrillDownTrProps?: boolean;
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
    useDrillDownTrProps: boolean;
  };
}
export default DrillDownTable;
export { WithHeaders, getColumns, DropDownCell, DropDownCellProps };
