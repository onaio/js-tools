import React from 'react';
import { CellInfo } from 'react-table-v6';
import { CARET, CLICKABLE_CSS_CLASS, LINKER_ITEM_CSS_CLASS } from './constants';

/** Interface for DropDown cell props */
export interface DropDownCellProps {
  cell: CellInfo;
  cellValue: Node;
  hasChildren: boolean;
}

/** Component that will be rendered in drop-down table cells showing a caret
 * that indicates if you can drill-down a row of data or not.
 */
const DropDownCell: React.ElementType = (props: DropDownCellProps) => {
  const { cellValue, hasChildren } = props;
  return (
    <div className={hasChildren ? CLICKABLE_CSS_CLASS : LINKER_ITEM_CSS_CLASS}>
      <span>
        {cellValue}
        {hasChildren && CARET}
      </span>
    </div>
  );
};

export default DropDownCell;
