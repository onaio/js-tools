import React, { ComponentType } from 'react';
// Import React Table
import ReactTable, { TableProps } from 'react-table';
import 'react-table/react-table.css';
import { columnsFromObject } from './utils';

/** A Higher order component that ensures table headers (column) are present
 * and are passed on to the WrappedTable component.
 * If columns already exist as a prop then nothing happens, otherwise columns
 * are derived from the data itself.
 */
export function WithHeaders(WrappedTable: ComponentType) {
  // HOC that enhances ReactTable

  class ResultingTable extends React.Component<Partial<TableProps>, {}> {
    constructor(props: TableProps) {
      super(props);
    }

    public getColumns() {
      // Either use provided columns or get them from the data
      const { data, columns } = this.props;
      if (columns) {
        return columns;
      }
      if (data) {
        return columnsFromObject(data[0]);
      }
    }

    public render() {
      const newProps = {
        columns: this.getColumns()
      };
      return <WrappedTable {...newProps} {...this.props} />;
    }
  }

  return ResultingTable;
}

const DrillDownTable = WithHeaders(ReactTable);

export default DrillDownTable;
