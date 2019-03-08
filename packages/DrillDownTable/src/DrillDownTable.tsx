import React, { ComponentType } from 'react';
import ReactTable, { FinalState, TableProps } from 'react-table';
import 'react-table/react-table.css';
import { ID, PARENT_ID, ROOT_PARENT_ID } from './constants';
import { FlexObject } from './utils';
import WithHeaders from './WithHeaders';

/** Interface to define props of Drill down table */
export interface DrillDownProps<T> extends Partial<TableProps<T>> {
  identifierField?: string;
  parentIdentifierField?: string;
  rootParentId?: any;
}

/** Interface for state */
interface State<T> extends Partial<FinalState<T>> {
  currentParentId: any;
}

/** A Higher order component that adds drill-down capability to render
 * hierarchical data in tables that allow you to move from the highest level to
 * the lowest, nad back with maximum flexibility.
 */
export function WithDrillDown(WrappedTable: ComponentType<any>) {
  class TableWithDrills<T extends object> extends React.Component<
    Partial<DrillDownProps<T>>,
    Partial<State<T>>
  > {
    public static defaultProps = {
      identifierField: ID,
      parentIdentifierField: PARENT_ID,
      rootParentId: ROOT_PARENT_ID
    };

    constructor(props: DrillDownProps<T>) {
      super(props);
      this.getTrProps.bind(this);
      this.state = {
        currentParentId: this.props.rootParentId
      };
    }

    public render() {
      const { getTrProps } = this;
      const nextLevelData = this.getLevelData();
      const newProps: FlexObject = { getTrProps };

      if (nextLevelData && nextLevelData.length > 0) {
        newProps.data = nextLevelData;
      }

      return <WrappedTable {...this.props} {...newProps} />;
    }

    /** callback used to filter data using parent field */
    private filterForLevel(element: FlexObject) {
      const { parentIdentifierField } = this.props;
      const { currentParentId } = this.state;
      if (parentIdentifierField && element.hasOwnProperty(parentIdentifierField)) {
        return element[parentIdentifierField] === currentParentId;
      }
      return false;
    }

    /** Method to get data for the current hierarchical level */
    private getLevelData() {
      const { data } = this.props;
      if (data) {
        return data.filter(this.filterForLevel, this);
      }
      return data;
    }

    /** getTrProps hook set up to hand drill-down using click event */
    private getTrProps = (row: object, instance: FlexObject) => {
      return {
        onClick: () => {
          const { identifierField, parentIdentifierField } = this.props;
          if (identifierField && parentIdentifierField) {
            const newParentId = instance.original[identifierField];
            this.setState({
              currentParentId: newParentId
            });
          }
        },
        row
      };
    };
  }

  return TableWithDrills;
}

const DrillDownTable = WithDrillDown(WithHeaders(ReactTable));
export default DrillDownTable;
