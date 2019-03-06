import React, { ComponentType } from 'react';
// Import React Table
import ReactTable, { TableProps } from 'react-table';
import 'react-table/react-table.css';
import { columnsFromObject } from './utils';

function DrillDownTableHOC(WrappedTable: ComponentType) {
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

const DrillDownTable = DrillDownTableHOC(ReactTable);

export default DrillDownTable;
