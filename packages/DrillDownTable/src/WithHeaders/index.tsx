import React from 'react';
import ReactTable, { Column, TableProps } from 'react-table';
import 'react-table/react-table.css';
import { columnsFromObject } from '../helpers/utils';

/** Simple function to use provided columns or get them from the data */
export function getColumns(props: Partial<TableProps>): Column[] {
  const { data, columns } = props;
  if (columns) {
    return columns;
  }
  if (data) {
    return columnsFromObject(data[0]);
  }

  return [];
}

/** A Higher order component that ensures table headers (column) are present
 * and are passed on to the WrappedTable component.
 * If columns already exist as a prop then nothing happens, otherwise columns
 * are derived from the data itself.
 */
function WithHeaders(props: Partial<TableProps>) {
  const newProps = {
    columns: getColumns(props)
  };
  return <ReactTable {...newProps} {...props} />;
}

export default WithHeaders;
