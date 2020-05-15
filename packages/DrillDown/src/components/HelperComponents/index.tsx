import React from 'react';
import {
  CARET_SPAN,
  CLICKABLE_CSS_CLASS,
  LINKER_ITEM_CSS_CLASS,
  LOADING,
  NO_DATA_FOUND
} from '../../helpers/constants';

/** Rendered component when there is no data for table component to render */
export const NullDataComponent = () => (
  <div className="">
    <p>{NO_DATA_FOUND}</p>
  </div>
);

/** Interface for DropDown cell props */
export interface DropDownCellProps {
  cellValue: Node;
  hasChildren: boolean;
}

/** Component that will be rendered in drop-down table cells showing a caret
 * that indicates if you can drill-down a row of data or not.
 */
export const DropDownCell: React.ElementType = (props: DropDownCellProps) => {
  const { cellValue, hasChildren } = props;
  return (
    <div className={hasChildren ? CLICKABLE_CSS_CLASS : LINKER_ITEM_CSS_CLASS}>
      <span>
        {cellValue}
        {hasChildren && CARET_SPAN}
      </span>
    </div>
  );
};

export const Ripple = () => {
  return <p>{LOADING}</p>;
};
