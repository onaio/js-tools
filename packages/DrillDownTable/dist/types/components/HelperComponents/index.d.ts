import React from 'react';
import { Cell } from 'react-table';
export interface NullDataComponentProps {
    noDataFound: string;
}
/** Rendered component when there is no data for table component to render */
declare const NullDataComponent: {
    (props: NullDataComponentProps): JSX.Element;
    defaultProps: NullDataComponentProps;
};
export { NullDataComponent };
/** Interface for DropDown cell props */
export interface DropDownCellProps {
    cell: Cell;
    cellValue: Node;
    hasChildren: boolean;
}
/** Component that will be rendered in drop-down table cells showing a caret
 * that indicates if you can drill-down a row of data or not.
 */
export declare const DropDownCell: React.ElementType;
export interface SpinnerProps {
    loadingText: string;
}
/** default loader component */
declare const Spinner: {
    (props: SpinnerProps): JSX.Element;
    defaultProps: SpinnerProps;
};
export { Spinner };
