import { Dictionary } from '@onaio/utils';
import React, { useState } from 'react';
import { Cell } from 'react-table';
import { DrillDownTableProps } from '../helpers/types';
import { defaultDrillDownFilter } from '../helpers/utils';
import { DropDownCell, DropDownCellProps, Spinner } from './HelperComponents';
import { defaultTableProps, DrillDownColumn, Table, TableJSXProps } from './TableJSX';

/** only provide defaults for the props that are actionable as part of this HOC */
export const defaultDrillDownTableProps = {
  ...defaultTableProps,
  CellComponent: DropDownCell,
  drillDownFilter: defaultDrillDownFilter,
  loading: false,
  loadingComponent: Spinner
};

/** HOC component; wraps around and controls a component that makes use of react-table hooks
 * its main goal is to filter data based on set current parent id  and pass it to controlled presentational component
 */
function DrillDownTable<D extends object>(props: DrillDownTableProps<D>) {
  const {
    columns,
    data,
    parentIdentifierField,
    hasChildren,
    loadingComponent: LoadingComponent
  } = props;
  const parentNodes =
    data && parentIdentifierField ? data.map((el: Dictionary) => el[parentIdentifierField]) : [];
  const [pageData, setPageData] = useState<D[]>([]);

  const mutatedColumns = React.useMemo(() => columns.map(mutateColumns), [columns]) as Array<
    DrillDownColumn<D>
  >;

  /** filters out props.data and excludes records whose parent record does not have the specified id
   * it is invoked each time the presentational component renders only if props.data has changed
   */
  const fetchData = React.useCallback(
    ({ skipPageResetRef, currentParentId: parentId }) => {
      /** a useRef that used to control how react-table resets its state, by default react-table
       * will reset state everytime data option changes, here we want to change the data option
       * that we pass to react-table but we dont want the state to change.
       */
      skipPageResetRef.current = true;
      let filterByLevel = props.data;
      if (props.useDrillDown) {
        filterByLevel = props.drillDownFilter(props, parentId);
      }
      setPageData(filterByLevel);
    },
    [data]
  );

  /** Get modified columns
   * Modify the linker column to include an indicator that you can use to
   * drill-down
   */
  function mutateColumns(el: Dictionary) {
    const { linkerField, CellComponent, extraCellProps } = props;
    if (el.hasOwnProperty('columns') && el.columns && el.columns.length > 0) {
      const newColumns = el.columns.map(mutateColumns);
      el.columns = newColumns;
    }

    if (el.accessor === linkerField) {
      el.Cell = (cell: Cell<D>) => {
        if (CellComponent !== undefined) {
          const { identifierField } = props;

          let thisCellHasChildren = false;
          if (
            hasChildren &&
            identifierField &&
            hasChildren(cell, parentNodes, identifierField, props.data)
          ) {
            thisCellHasChildren = true;
          }

          const cellProps: DropDownCellProps<D> = {
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

  /** pass all props to the presentational component */
  const TableProps = {
    ...props,
    columns: mutatedColumns,
    data: pageData,
    fetchData,
    parentNodes
  };

  return <>{!props.loading ? <Table {...TableProps} /> : <LoadingComponent />}</>;
}

DrillDownTable.defaultProps = defaultDrillDownTableProps;

export { DrillDownTable };
