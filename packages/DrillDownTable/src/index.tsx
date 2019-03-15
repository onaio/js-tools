import React, { useState } from 'react';
import ReactTable, { CellInfo, Column, FinalState, RowInfo, TableProps } from 'react-table';
import './DrillDownTable.css';
import { ID, PARENT_ID, ROOT_PARENT_ID } from './helpers/constants';
import DropDownCell, { DropDownCellProps } from './helpers/DropDownCell';
import { FlexObject } from './helpers/utils';
import WithHeaders, { getColumns } from './WithHeaders';

/** Interface to define props of Drill down table */
export interface DrillDownProps<T> extends Partial<TableProps<T>> {
  CellComponent: React.ElementType<DropDownCellProps>;
  identifierField?: string;
  linkerField?: string;
  parentIdentifierField?: string;
  rootParentId?: any;
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

  /** Get modified columns
   * Modify the linker column to include an indicator that you can use to
   * drill-down
   */
  function mutateColumns(el: Column) {
    const { linkerField, CellComponent } = props;
    if (el.hasOwnProperty('columns') && el.columns && el.columns.length > 0) {
      const newColumns = el.columns.map(mutateColumns);
      el.columns = newColumns;
    }
    if (el.accessor === linkerField) {
      el.Cell = (cell: CellInfo) => {
        if (CellComponent !== undefined) {
          const cellProps: DropDownCellProps = {
            cellValue: cell.value,
            hasChildren: hasChildren(cell)
          };
          return <CellComponent {...cellProps} />;
        }
        return cell.value;
      };
    }
    return el;
  }

  // finalize
  const nextLevelData = getLevelData();
  const newProps: FlexObject = { getTrProps };
  Object.assign(newProps, props); // copy props to newProps
  newProps.columns = columns.map(mutateColumns);
  if (nextLevelData && nextLevelData.length > 0) {
    newProps.data = nextLevelData;
  }

  return <ReactTable {...newProps} />;
}

DrillDownTable.defaultProps = {
  CellComponent: DropDownCell,
  identifierField: ID,
  linkerField: ID,
  parentIdentifierField: PARENT_ID,
  rootParentId: ROOT_PARENT_ID
};

export default DrillDownTable;

export { WithHeaders, getColumns, DropDownCell };
