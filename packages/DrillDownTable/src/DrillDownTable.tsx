import React, { ComponentType } from 'react';
import ReactTable, { TableProps } from 'react-table';
import 'react-table/react-table.css';
import { ID, PARENT_ID, ROOT_PARENT_ID } from './constants';
import { DataElement } from './utils';
import WithHeaders from './WithHeaders';

/** Interface to define props of Drill down table */
export interface DrillDownProps<T> extends Partial<TableProps<T>> {
  identifierField?: string;
  parentIdentifierField?: string;
  rootParentId?: any;
}

/** Interface for state */
interface State {
  currentParentId: any;
}

/** A Higher order component that adds drill-down capability to render
 * hierarchical data in tables that allow you to move from the highest level to
 * the lowest, nad back with maximum flexibility.
 */
export function WithDrillDown(WrappedTable: ComponentType<any>) {
  class TableWithDrills<T extends object> extends React.Component<
    Partial<DrillDownProps<T>>,
    State
  > {
    public static defaultProps = {
      identifierField: ID,
      parentIdentifierField: PARENT_ID,
      rootParentId: ROOT_PARENT_ID
    };

    constructor(props: DrillDownProps<T>) {
      super(props);
      this.state = {
        currentParentId: this.props.rootParentId
      };
    }

    public render() {
      const newProps = {
        data: this.getHierarchicyData()
      };
      return <WrappedTable {...this.props} {...newProps} />;
    }

    private filterForLevel(element: DataElement) {
      const { parentIdentifierField } = this.props;
      const { currentParentId } = this.state;
      if (parentIdentifierField && element.hasOwnProperty(parentIdentifierField)) {
        return element[parentIdentifierField] === currentParentId;
      }
      return false;
    }

    private getHierarchicyData() {
      const { data } = this.props;
      if (data) {
        return data.filter(this.filterForLevel, this);
      }
      return data;
    }
  }

  return TableWithDrills;
}

const DrillDownTable = WithDrillDown(WithHeaders(ReactTable));
export default DrillDownTable;
