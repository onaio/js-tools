import React, { useState } from 'react';
import ReactTable, { Column, FinalState, RowInfo, TableProps } from 'react-table';
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
import WithHeaders, { getColumns } from './WithHeaders';

/** Interface to define props of Drill down table */
export interface DrillDownProps<T> extends Partial<TableProps<T>> {
  identifierField?: string;
  linkerField?: string;
  parentIdentifierField?: string;
  rootParentId?: any;
  DrillDownIndicator: Node;
}

/** Interface for state */
interface State<D> extends Partial<FinalState<D>> {
  currentParentId: any;
  previousParentId: any;
  originalData: FlexObject[];
  parentNodes: string[];
}

/** A Higher order component that adds drill-down capability to render
 * hierarchical data in tables that allow you to move from the highest level to
 * the lowest, nad back with maximum flexibility.
 */
function DrillDownTable<T>(props: Partial<DrillDownProps<T>>) {
  const { data, parentIdentifierField } = props;
  const columns = getColumns(props);
  // state variables
  const [currentParentId, setCurrentParentId] = useState(props.rootParentId);
  const [originalData] = useState(props.data);
  const [parentNodes] = useState(
    data && parentIdentifierField ? data.map((el: FlexObject) => el[parentIdentifierField]) : []
  );
  const [previousParentId, setPreviousParentId] = useState(null);

  /** callback used to filter data using parent field */
  function filterForLevel(this: FlexObject, element: FlexObject) {
    if (
      this.props.parentIdentifierField &&
      element.hasOwnProperty(this.props.parentIdentifierField)
    ) {
      return element[this.props.parentIdentifierField] === this.state.currentParentId;
    }
    return false;
  }

  /** Method to get data for the current hierarchical level */
  function getLevelData() {
    const currentState: Partial<State<T>> = { currentParentId };
    const customThis: FlexObject = { props, state: currentState };
    if (data) {
      return data.filter(filterForLevel, customThis);
    }
    return data;
  }

  /** Check if a row of data has children */
  function hasChildren(row: RowInfo) {
    const { identifierField } = props;
    if (identifierField && parentNodes && parentNodes.includes(row.original[identifierField])) {
      return true;
    }
    return false;
  }

  /** getTrProps hook set up to handle drill-down using click event */
  const getTrProps = (row: RowInfo, instance: RowInfo) => {
    return {
      onClick: () => {
        if (props.identifierField && props.parentIdentifierField) {
          if (hasChildren(instance)) {
            const newParentId = instance.original[props.identifierField];
            const oldParentId = instance.original[props.parentIdentifierField];
            setCurrentParentId(newParentId);
            setPreviousParentId(oldParentId);
          }
        }
      },
      row
    };
  };

  /** Callback used to filter columns to get linker columns.  Runs recursively */
  function filterLinkerColumns(this: FlexObject, element: Column): boolean {
    if (element.hasOwnProperty('columns')) {
      // if we get here it means we are dealing with nested columns and
      // have to resort to recursion
      if (element.columns && element.columns.length > 0) {
        // returnVal holds any columns found
        const returnVal: Column[] = element.columns.filter(filterLinkerColumns, { props });
        return returnVal.length > 0;
      }
      return false;
    }
    const { linkerField } = this.props;
    if (linkerField) {
      return element.accessor === linkerField;
    }
    return false;
  }

  /** Get linker column */
  function getLinkerColumn(columnsList: Column[]): Column | null {
    if (columnsList && columnsList.length > 0) {
      const linkerColumns: Column[] = columnsList.filter(filterLinkerColumns, { props });
      if (linkerColumns.length > 0) {
        return linkerColumns[0];
      }
    }
    return null;
  }

  /** Get modified columns
   * Modify the linker column to include an indicator that you can use to
   * drill-down
   */
  function getModifiedColumns() {
    const { DrillDownIndicator } = props;
    if (columns && columns.length > 0) {
      const linkerColumn = getLinkerColumn(columns);
      if (linkerColumn !== null) {
        const otherColumns: Column[] = columns.filter((element: Column) => {
          return element.accessor !== linkerColumn.accessor;
        });

        const modifiedLinkerColumn: Column = {
          Cell: row => {
            const definitelyHasChildren: boolean = hasChildren(row);
            return (
              <div className={definitelyHasChildren ? CLICKABLE_CSS_CLASS : LINKER_ITEM_CSS_CLASS}>
                <span>
                  {row.value}
                  {definitelyHasChildren && DrillDownIndicator}
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

  // finalize
  const nextLevelData = getLevelData();
  const newProps: FlexObject = { getTrProps };
  Object.assign(newProps, props); // copy props to newProps
  newProps.columns = getModifiedColumns();
  if (nextLevelData && nextLevelData.length > 0) {
    newProps.data = nextLevelData;
  }

  return <ReactTable {...newProps} />;
}

DrillDownTable.defaultProps = {
  DrillDownIndicator: CARET,
  identifierField: ID,
  linkerField: ID,
  parentIdentifierField: PARENT_ID,
  rootParentId: ROOT_PARENT_ID
};

export default DrillDownTable;

export { WithHeaders, getColumns, FlexObject };
