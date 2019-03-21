/// <reference types="react" />
import { Column, TableProps } from 'react-table';
/** Simple function to use provided columns or get them from the data */
export declare function getColumns(props: Partial<TableProps>): Column[];
/** A Higher order component that ensures table headers (column) are present
 * and are passed on to the WrappedTable component.
 * If columns already exist as a prop then nothing happens, otherwise columns
 * are derived from the data itself.
 */
declare function WithHeaders(props: Partial<TableProps>): JSX.Element;
export default WithHeaders;
