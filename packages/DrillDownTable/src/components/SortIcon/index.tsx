import React from 'react';
import './sortIcon.css';

/** props passed to the Sort icon per column of react-Table */
export interface SortIconProps {
  isSorted: boolean;
  isSortedDesc: boolean | undefined;
}

/** component used to render a custom sort direction icon */
export const SortIcon = (props: SortIconProps) => {
  const cssClass = props.isSorted ? (props.isSortedDesc ? 'desc' : 'asc') : '';
  return (
    <div className="icon-wrapper">
      <div className={`previous-next-filled ${cssClass} icon`} />
    </div>
  );
};
