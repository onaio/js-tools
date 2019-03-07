import React, { ComponentType } from 'react';
import ReactTable, { TableProps } from 'react-table';
import 'react-table/react-table.css';
import WithHeaders from './WithHeaders';

/** A Higher order component that adds drill-down capability to render
 * hierarchical data in tables that allow you to move from the highest level to
 * the lowest, nad back with maximum flexibility.
 */
export function WithDrillDown(WrappedTable: ComponentType) {
  class TableWithDrills extends React.Component<Partial<TableProps>, {}> {
    constructor(props: TableProps) {
      super(props);
    }

    public render() {
      const newProps = {};
      return <WrappedTable {...newProps} {...this.props} />;
    }
  }

  return TableWithDrills;
}

const DrillDownTable = WithHeaders(ReactTable);
export default DrillDownTable;
