/// <reference types="react" />
import './sortIcon.css';
/** props passed to the Sort icon per column of react-Table */
export interface SortIconProps {
  isSorted: boolean;
  isSortedDesc: boolean | undefined;
}
/** component used to render a custom sort direction icon */
export declare const SortIcon: (props: SortIconProps) => JSX.Element;
