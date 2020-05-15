import { Dictionary } from '@onaio/utils';
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
  Cell,
  Column,
  ColumnInstance,
  Row,
  usePagination,
  UsePaginationInstanceProps,
  useSortBy,
  UseSortByColumnProps,
  useTable,
  UseTableHeaderGroupProps,
  UseTableOptions
} from 'react-table';
import { DEFAULT_ROW_HEIGHT, ID, PARENT_ID, ROOT_PARENT_ID } from '../helpers/constants';
import { NullDataComponent } from './HelperComponents';
import { renderPaginationFun } from './Pagination/pagination';
import { SortIcon } from './SortIcon/sortIcon';

/** Type definition for hasChildrenFunc */
export type HasChildrenFuncType = <D extends object>(
  cellObject: Cell<D>,
  parentIdList: number[] | string[],
  idField: string | number
) => boolean;

/** Check if a Cell  is part of a row whose data entry can be considered to have children */
export function hasChildrenFunc<D extends object>(
  cellObject: Cell<D>,
  parentIdList: Array<number | string>,
  idField: string | number = ID
) {
  return parentIdList.includes((cellObject.row.original as Dictionary)[idField]);
}

/** props for render Prop used to render filters in the top filter bar */
export interface RenderFiltersInBarOptions {
  setRowHeight: Dispatch<SetStateAction<string>>;
}

/** the custom default options that will be given to a render prop that renders the pagination */
export interface RenderPaginationOptions<T extends object> extends UsePaginationInstanceProps<T> {
  pageSize: number;
  pageIndex: number;
}

/** describes props for the underlying Table component : TData is the type of data to be rendered in table */
export interface TableJSXProps<TData extends object> {
  columns: Array<Column<TData>> /** columns as per react-table format */;
  data: TData[] /** array of data */;
  fetchData: (
    options: Dictionary
  ) => void /** function that dynamically changes the chunk of data given to react-table */;
  identifierField: string /** unique identifier for a row */;
  parentNodes: Array<string | number> /** array of identifiers for all rows that have children */;
  parentIdentifierField: string /** the field to identify a row's parent */;
  hasChildren: HasChildrenFuncType /** function to check if a row of data has children or not */;
  showBottomPagination: boolean /** whether to show pagination below table */;
  renderPagination: (
    props: RenderPaginationOptions<TData>
  ) => ReactNode /** renderProp to for custom pagination */;
  showTopPagination: boolean /** show pagination above table */;
  renderFilterBar: true /** whether to show the filter components */;
  renderInFilterBar: (
    prop: RenderFiltersInBarOptions
  ) => ReactNode /** add a section to the left of top pagination for filter components */;
  rootParentId:
    | string
    | null /** the value of parentIdentifierField for rows that have not parent */;
  renderNullDataComponent: () => ReactNode /** component to render if data is empty array */;
  linkerField?: string /** the field to be used to drill down the data */;
  useDrillDown: boolean /** whether component can act as a normal table */;
}

/** default props for TableJSX */
export const defaultTableProps: Omit<TableJSXProps<{}>, 'columns' | 'fetchData' | 'parentNodes'> = {
  data: [],
  hasChildren: hasChildrenFunc,
  identifierField: ID,
  linkerField: ID,
  parentIdentifierField: PARENT_ID,
  renderFilterBar: true,
  renderInFilterBar: () => null,
  renderNullDataComponent: NullDataComponent,
  renderPagination: renderPaginationFun,
  rootParentId: ROOT_PARENT_ID,
  showBottomPagination: true,
  showTopPagination: true,
  useDrillDown: true
};

/** the underlying Table component
 * its seprarate since we want to control some of its aspects, specifically pagination
 */
function Table<D extends object>(props: TableJSXProps<D>) {
  const { columns, data, fetchData, identifierField } = props;

  const skipPageResetRef = React.useRef<boolean>();
  const [rHeight, setRowHeight] = React.useState<string>(DEFAULT_ROW_HEIGHT);
  const [currentParentId, setCurrentParentId] = useState<string | null>(props.rootParentId);

  /** describe the column instance after including hooks. */
  interface ActualColumnInstance<T extends object>
    extends ColumnInstance<T>,
      UseSortByColumnProps<T>,
      UsePaginationInstanceProps<T> {}

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    page,
    state: { pageIndex, pageSize }
  }: Dictionary = useTable(
    {
      // prevent the table from auto resetting when we change our data source,
      // for instance if we were to change the data prop dynamically in the controlling component
      autoResetPage: !skipPageResetRef.current,
      autoResetSortBy: !skipPageResetRef.current,
      columns,
      data,
      initialState: { pageIndex: 0 }
    } as UseTableOptions<D>,
    useSortBy,
    usePagination
  );

  React.useEffect(() => {
    // data passed to this component is controlled by the component that defines fetchData.
    // the controlling component filters the data based on the current parent id and then passes it
    // on down to this component as the data prop.
    fetchData({ skipPageResetRef, currentParentId });
    skipPageResetRef.current = false;
  }, [fetchData, currentParentId]);

  return (
    <div className="table-container mb-3">
      <div className="row">
        <div className="col">
          {props.renderInFilterBar({ setRowHeight })}
          {props.showTopPagination &&
            props.renderPagination({
              canNextPage,
              canPreviousPage,
              gotoPage,
              nextPage,
              page,
              pageCount,
              pageIndex,
              pageOptions,
              pageSize,
              previousPage,
              setPageSize
            })}
        </div>
      </div>
      <table className="table table-striped table-bordered drill-down-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: UseTableHeaderGroupProps<D>) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((c: ColumnInstance<D>, index: number) => {
                const column = (c as unknown) as ActualColumnInstance<D>;
                return (
                  <th
                    // Return an array of prop objects and react-table will merge them appropriately
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={`thead-th-${index}`}
                  >
                    {column.render('Header')}
                    {column.canSort && (
                      <SortIcon isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {data.length > 0 && (
          <tbody {...getTableBodyProps([{ style: { lineHeight: rHeight } }])}>
            {page.map((row: Row<D>, idx: number) => {
              prepareRow(row);
              return (
                // Merge user row props in
                <tr {...row.getRowProps()} key={`tbody-tr-${idx}`}>
                  {row.cells.map((cell: Cell<D>, i: number) => {
                    return (
                      <td
                        // Return an array of prop objects and react-table will merge them appropriately
                        {...cell.getCellProps([
                          {
                            // onclickHandler updates the curentParentId, i.e if the clicked on cell has children
                            onClick: (e: React.MouseEvent<HTMLElement>) => {
                              e.stopPropagation();
                              // onClick will be effective only when drilldingDown and if columnId is the same as linkerField
                              if (!(props.useDrillDown && cell.column.id === props.linkerField)) {
                                return;
                              }
                              if (props.identifierField && props.parentIdentifierField) {
                                if (
                                  props.hasChildren &&
                                  hasChildrenFunc<D>(cell, props.parentNodes, props.identifierField)
                                ) {
                                  const newParentId: string = (row.original as Dictionary)[
                                    identifierField
                                  ];
                                  setCurrentParentId(newParentId);
                                }
                              }
                            }
                          }
                        ] as any)}
                        key={`td-${i}`}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {data.length === 0 && props.renderNullDataComponent()}
      <div className="row">
        <div className="col">
          {props.showBottomPagination &&
            props.renderPagination({
              canNextPage,
              canPreviousPage,
              gotoPage,
              nextPage,
              page,
              pageCount,
              pageIndex,
              pageOptions,
              pageSize,
              previousPage,
              setPageSize
            })}
        </div>
      </div>
    </div>
  );
}

Table.defaultProps = defaultTableProps;
export { Table };
