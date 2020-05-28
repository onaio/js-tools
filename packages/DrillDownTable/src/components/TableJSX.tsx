import { Dictionary } from '@onaio/utils';
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
  Cell,
  Column,
  ColumnInstance,
  Row,
  TableState,
  usePagination,
  UsePaginationInstanceProps,
  UsePaginationState,
  useSortBy,
  UseSortByColumnProps,
  UseSortByInstanceProps,
  UseSortByState,
  useTable,
  UseTableHeaderGroupProps,
  UseTableInstanceProps,
  UseTableOptions
} from 'react-table';
import { DEFAULT_ROW_HEIGHT, ID, PARENT_ID, ROOT_PARENT_ID } from '../helpers/constants';
import { NullDataComponent } from './HelperComponents';
import { SortIcon } from './SortIcon';

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

/** the actual table instance returned from UseTable() after including usePagination and useSortBy hooks */
export interface ActualTableInstanceProps<T extends object>
  extends Omit<UseTableInstanceProps<T>, 'state'>,
    UsePaginationInstanceProps<T>,
    UseSortByInstanceProps<T> {
  state: TableState<T> & UsePaginationState<T> & UseSortByState<T>;
}

/** props for render Prop used to render filters section */
export interface RenderFiltersInBarOptions<T extends object> extends ActualTableInstanceProps<T> {
  setRowHeight: Dispatch<SetStateAction<string>>;
}

/** props for render prop function that render filter section */
export type FilterBarRenderer<TData extends object> = (
  prop: RenderFiltersInBarOptions<TData>
) => ReactNode;

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
  renderInTopFilterBar?: FilterBarRenderer<
    TData
  > /** add a section immediately above table for filter components */;
  renderInBottomFilterBar?: FilterBarRenderer<
    TData
  > /** add a section immediately above table for filter components */;
  rootParentId:
    | string
    | null /** the value of parentIdentifierField for rows that have not parent */;
  nullDataComponent: React.ElementType /** component to render if data is empty array */;
  linkerField?: string /** the field to be used to drill down the data */;
  useDrillDown: boolean /** whether component can act as a normal table */;
}

/** default props for TableJSX */
export const defaultTableProps: Omit<TableJSXProps<{}>, 'columns' | 'fetchData' | 'parentNodes'> = {
  data: [],
  hasChildren: hasChildrenFunc,
  identifierField: ID,
  linkerField: ID,
  nullDataComponent: NullDataComponent,
  parentIdentifierField: PARENT_ID,
  rootParentId: ROOT_PARENT_ID,
  useDrillDown: true
};

/** the underlying Table component
 * its separate since we want to control some of its aspects, specifically pagination
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

  const tableProps: ActualTableInstanceProps<D> = (useTable(
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
  ) as unknown) as ActualTableInstanceProps<D>;

  React.useEffect(() => {
    // data passed to this component is controlled by the component that defines fetchData.
    // the controlling component filters the data based on the current parent id and then passes it
    // on down to this component as the data prop.
    fetchData({ skipPageResetRef, currentParentId });
    skipPageResetRef.current = false;
  }, [fetchData, currentParentId]);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = tableProps;

  return (
    <div className="table-container mb-3">
      {props.renderInTopFilterBar && props.renderInTopFilterBar({ ...tableProps, setRowHeight })}
      <div {...getTableProps()} className="table div-table">
        <div className="thead">
          {headerGroups.map((headerGroup: UseTableHeaderGroupProps<D>) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((c: ColumnInstance<D>, index: number) => {
                const column = (c as unknown) as ActualColumnInstance<D>;
                return (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={`thead-th-${index}`}
                    className="th"
                  >
                    {column.render('Header')}
                    {column.canSort && (
                      <SortIcon isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {/* TODO - the style for lineHeight should now be div height */}
        <div {...getTableBodyProps([{ style: { lineHeight: rHeight } }])} className="tbody">
          {page.map((row: Row<D>, idx: number) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} key={`tbody-tr-${idx}`} className="tr">
                {row.cells.map((cell: Cell<D>, i: number) => {
                  return (
                    <div
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
                      className="td"
                    >
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {data.length === 0 && <props.nullDataComponent />}
      {props.renderInBottomFilterBar &&
        props.renderInBottomFilterBar({ ...tableProps, setRowHeight })}
    </div>
  );
}

Table.defaultProps = defaultTableProps;
export { Table };
