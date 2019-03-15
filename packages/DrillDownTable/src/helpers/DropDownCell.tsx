import React from 'react';
import { CARET, CLICKABLE_CSS_CLASS, LINKER_ITEM_CSS_CLASS } from './constants';

export interface DropDownCellProps {
  cellValue: Node;
  hasChildren: boolean;
}

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
