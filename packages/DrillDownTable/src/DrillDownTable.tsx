import React, { ComponentType } from 'react';
import ReactTable, { TableProps } from 'react-table';
import 'react-table/react-table.css';
import { DataElement } from './utils';
import WithHeaders from './WithHeaders';

/** Interface to define props of Drill down table */
interface DrillDownProps<T> extends Partial<TableProps<T>> {
  identifierField?: string;
  parentIdentifierField?: string;
}

/** A Higher order component that adds drill-down capability to render
 * hierarchical data in tables that allow you to move from the highest level to
 * the lowest, nad back with maximum flexibility.
 */
export function WithDrillDown(WrappedTable: ComponentType) {
  class TableWithDrills<T extends object> extends React.Component<Partial<DrillDownProps<T>>, {}> {
    public static defaultProps = {
      identifierField: 'id',
      parentIdentifierField: 'parent_id'
    };

    constructor(props: DrillDownProps<T>) {
      super(props);
    }

    public render() {
      const newProps = {
        data: this.getHierarchicyData()
      };
      return <WrappedTable {...this.props} {...newProps} />;
    }

    private filterForLevel(element: DataElement) {
      if (element.hasOwnProperty('parent_id')) {
        return element.parent_id === null;
      }
      return false;
    }

    private getHierarchicyData() {
      const { data } = this.props;
      if (data) {
        return data.filter(this.filterForLevel);
      }
      return data;
    }
  }

  return TableWithDrills;
}

const DrillDownTable = WithHeaders(WithDrillDown(ReactTable));
export default DrillDownTable;
