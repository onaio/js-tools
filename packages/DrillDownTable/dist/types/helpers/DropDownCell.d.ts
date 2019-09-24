import React from 'react';
import { CellInfo } from 'react-table';
/** Interface for DropDown cell props */
export interface DropDownCellProps {
  cell: CellInfo;
  cellValue: Node;
  hasChildren: boolean;
}
/** Component that will be rendered in drop-down table cells showing a caret
 * that indicates if you can drill-down a row of data or not.
 */
declare const DropDownCell: React.ElementType;
export default DropDownCell;
