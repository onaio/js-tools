import React, { ComponentType } from 'react';
import ReactTable, { Column, FinalState, RowInfo, TableProps } from 'react-table';
import 'react-table/react-table.css';
import './DrillDownTable.css';
import {
  CARET,
  CLICKABLE_CSS_CLASS,
  ID,
  LINKER_ITEM_CSS_CLASS,
  PARENT_ID,
  ROOT_PARENT_ID
} from './helpers/constants';
import { FlexObject } from './helpers/utils';
import WithHeaders from './WithHeaders';

/** Interface to define props of Drill down table */
export interface DrillDownProps<T> extends Partial<TableProps<T>> {
  identifierField?: string;
  linkerField?: string;
  parentIdentifierField?: string;
  rootParentId?: any;
  CaretElement: Node;
}

/** Interface for state */
interface State<T> extends Partial<FinalState<T>> {
  currentParentId: any;
  previousParentId: any;
  originalData: FlexObject[];
  parentNodes: string[];
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
      CaretElement: CARET,
      identifierField: ID,
      linkerField: ID,
      parentIdentifierField: PARENT_ID,
      rootParentId: ROOT_PARENT_ID
    };
    constructor(props: DrillDownProps<T>) {
      super(props);
      this.getTrProps.bind(this);
      const { data, parentIdentifierField } = this.props;
      this.state = {
        currentParentId: this.props.rootParentId,
        originalData: data,
        parentNodes:
          data && parentIdentifierField
            ? data.map((el: FlexObject) => el[parentIdentifierField])
            : [],
        previousParentId: null
      };
    }

    public render() {
      const { getTrProps } = this;
      const nextLevelData = this.getLevelData();
      const newProps: FlexObject = {
        columns: this.getModifiedColumns(),
        getTrProps
      };

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

    /** Callback used to filter columns to get linker columns */
    private filterLinkerColumns(element: Column) {
      const { linkerField } = this.props;
      if (linkerField) {
        return element.accessor === linkerField;
      }
      return false;
    }

    /** Get linker column */
    private getLinkerColumn() {
      const { columns } = this.props;
      if (columns && columns.length > 0) {
        const linkerColumns = columns.filter(this.filterLinkerColumns, this);
        if (linkerColumns.length > 0) {
          return linkerColumns[0];
        }
      }
      return null;
    }

    /** Check if a row of data has children */
    private hasChildren(row: RowInfo) {
      const { parentNodes } = this.state;
      const { identifierField } = this.props;
      if (identifierField && parentNodes && parentNodes.includes(row.original[identifierField])) {
        return true;
      }
      return false;
    }

    /** Get modified columns
     * Modify the linker column to include an indicator that you cna use it to
     * drill-down
     */
    private getModifiedColumns() {
      const { columns, CaretElement } = this.props;
      if (columns && columns.length > 0) {
        const linkerColumn = this.getLinkerColumn();
        if (linkerColumn !== null) {
          const otherColumns = columns.filter((element: Column) => {
            return element.accessor !== linkerColumn.accessor;
          });

          const modifiedLinkerColumn: Column = {
            Cell: row => {
              const hasChildren: boolean = this.hasChildren(row);
              return (
                <div className={hasChildren ? CLICKABLE_CSS_CLASS : LINKER_ITEM_CSS_CLASS}>
                  <span>
                    {row.value}
                    {hasChildren && CaretElement}
                  </span>
                </div>
              );
            },
            Header: linkerColumn.Header,
            accessor: linkerColumn.accessor
          };

          otherColumns.unshift(modifiedLinkerColumn);
          return otherColumns;
        } else {
          return columns;
        }
      }
    }

    /** getTrProps hook set up to handle drill-down using click event */
    private getTrProps = (row: RowInfo, instance: RowInfo) => {
      return {
        onClick: () => {
          const { identifierField, parentIdentifierField } = this.props;
          if (identifierField && parentIdentifierField) {
            if (this.hasChildren(instance)) {
              const newParentId = instance.original[identifierField];
              const oldParentId = instance.original[parentIdentifierField];
              this.setState({
                currentParentId: newParentId,
                previousParentId: oldParentId
              });
            }
          }
        },
        row
      };
    };
  }

  return TableWithDrills;
}

const DrillDownTable = WithHeaders(WithDrillDown(ReactTable));
export default DrillDownTable;
