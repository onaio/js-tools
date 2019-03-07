import React, { ComponentType } from 'react';
import { TableProps } from 'react-table';
import 'react-table/react-table.css';
import { columnsFromObject } from './utils';

/** A Higher order component that ensures table headers (column) are present
 * and are passed on to the WrappedTable component.
 * If columns already exist as a prop then nothing happens, otherwise columns
 * are derived from the data itself.
 */
function WithHeaders(WrappedTable: ComponentType) {
  class TableWithHeaders<T extends object> extends React.Component<Partial<TableProps<T>>, {}> {
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

  return TableWithHeaders;
}

export default WithHeaders;
