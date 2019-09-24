import React, { useEffect, useState } from 'react';
import ReactTable, { CellInfo, Column, FinalState, RowInfo, TableProps } from 'react-table';
import './DrillDownTable.css';
import { ID, PARENT_ID, ROOT_PARENT_ID } from './helpers/constants';
import DropDownCell, { DropDownCellProps } from './helpers/DropDownCell';
import { FlexObject } from './helpers/utils';
import WithHeaders, { getColumns } from './WithHeaders';

/** Type definition for hasChildrenFunc */
export type hasChildrenFuncType = (
  currentObject: RowInfo | CellInfo,
  parentIdList: number[] | string[],
  idField: string | number
) => boolean;

/** Check if a row of data has children */
export function hasChildrenFunc(
  currentObject: RowInfo | CellInfo,
  parentIdList: number[] | string[],
  idField: string | number = 'id'
) {
  return parentIdList.includes(currentObject.original[idField]);
}

/** Interface to define props of Drill down table */
export interface DrillDownProps<T> extends Partial<TableProps<T>> {
  CellComponent: React.ElementType /** The component used to render the cell that has the drill down */;
  extraCellProps?: FlexObject /** props to be given to CellComponent */;
  hasChildren?: hasChildrenFuncType /** function to check if a row of data has children or not */;
  identifierField?: string /** unique identifier for a row */;
  linkerField?: string /** the field to be used to drill down the data */;
  parentIdentifierField?: string /** the field to identify a row's parent */;
  rootParentId?: any /** the value of parentIdentifierField for rows that have not parent */;
  shouldUseEffect?: boolean /** should we use useEffect */;
  useDrillDownTrProps?: boolean /** whether to use drillDownTrProps */;
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
  const { data, hasChildren, parentIdentifierField, shouldUseEffect, useDrillDownTrProps } = props;
  const columns = getColumns(props);
  // state variables
  const [currentParentId, setCurrentParentId] = useState(props.rootParentId);
  const [originalData] = useState(props.data);
  const [parentNodes] = useState(
    data && parentIdentifierField ? data.map((el: FlexObject) => el[parentIdentifierField]) : []
  );
  const [previousParentId, setPreviousParentId] = useState(null);

  /** This ensures that if the `rootParentId` props changes then the state
   * is updated to match it
   */
  useEffect(() => {
    if (
      shouldUseEffect === true &&
      props.rootParentId != null &&
      props.rootParentId !== currentParentId
    ) {
      setPreviousParentId(currentParentId);
      setCurrentParentId(props.rootParentId);
    }
  });

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

  /** getTrProps hook set up to handle drill-down using click event */
  const drillDownTrProps = (row: RowInfo, instance: RowInfo) => {
    const { getTrProps } = props;
    if (getTrProps !== undefined) {
      return getTrProps;
    }
    return {
      onClick: () => {
        if (props.identifierField && props.parentIdentifierField) {
          if (hasChildren && hasChildren(instance, parentNodes, props.identifierField) === true) {
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
    const { linkerField, CellComponent, extraCellProps } = props;
    if (el.hasOwnProperty('columns') && el.columns && el.columns.length > 0) {
      const newColumns = el.columns.map(mutateColumns);
      el.columns = newColumns;
    }
    if (el.accessor === linkerField) {
      el.Cell = (cell: CellInfo) => {
        if (CellComponent !== undefined) {
          const { identifierField } = props;

          let thisCellHasChildren = false;
          if (hasChildren && identifierField && hasChildren(cell, parentNodes, identifierField)) {
            thisCellHasChildren = true;
          }

          const cellProps: DropDownCellProps = {
            cell,
            cellValue: cell.value,
            hasChildren: thisCellHasChildren
          };

          if (extraCellProps !== undefined) {
            Object.assign(cellProps, extraCellProps);
          }
          return <CellComponent {...cellProps} />;
        }
        return cell.value;
      };
    }
    return el;
  }

  // finalize
  const nextLevelData = getLevelData();
  const newProps: FlexObject = {};

  if (useDrillDownTrProps === true) {
    newProps.getTrProps = drillDownTrProps;
  }

  Object.assign(newProps, props); // copy props to newProps
  newProps.columns = columns.map(mutateColumns);
  if (nextLevelData && nextLevelData.length > 0) {
    newProps.data = nextLevelData;
  }

  return <ReactTable {...newProps} />;
}

DrillDownTable.defaultProps = {
  CellComponent: DropDownCell,
  hasChildren: hasChildrenFunc,
  identifierField: ID,
  linkerField: ID,
  parentIdentifierField: PARENT_ID,
  rootParentId: ROOT_PARENT_ID,
  shouldUseEffect: false,
  useDrillDownTrProps: true
};

export default DrillDownTable;

export { WithHeaders, getColumns, DropDownCell, DropDownCellProps };
