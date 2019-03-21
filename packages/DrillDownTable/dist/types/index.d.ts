import React from 'react';
import { TableProps } from 'react-table';
import './DrillDownTable.css';
import DropDownCell, { DropDownCellProps } from './helpers/DropDownCell';
import WithHeaders, { getColumns } from './WithHeaders';
/** Interface to define props of Drill down table */
export interface DrillDownProps<T> extends Partial<TableProps<T>> {
  CellComponent: React.ElementType<DropDownCellProps>;
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
    identifierField: string;
    linkerField: string;
    parentIdentifierField: string;
    rootParentId: null;
    useDrillDownTrProps: boolean;
  };
}
export default DrillDownTable;
export { WithHeaders, getColumns, DropDownCell, DropDownCellProps };
