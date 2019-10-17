/** Wraps basePagination with an interface that allows the basePagination
 * to work with the react-router.
 */
import React from 'react';
import { RouteComponentProps } from 'react-router';
/** interface for RoutedPagination props */
export interface RoutedPaginatorProps {
  ariaLabel?: string;
  endLabel: string;
  nextLabel: string;
  pageLimit: number;
  pageNeighbours: number;
  previousLabel: string;
  startLabel: string;
  totalRecords: number;
}
declare const RoutedPaginator: React.ComponentClass<
  Pick<
    RoutedPaginatorProps &
      RouteComponentProps<
        {
          tablePage?: string | undefined;
        },
        import('react-router').StaticContext,
        any
      >,
    | 'totalRecords'
    | 'pageLimit'
    | 'pageNeighbours'
    | 'ariaLabel'
    | 'endLabel'
    | 'nextLabel'
    | 'previousLabel'
    | 'startLabel'
  >,
  any
>;
export { RoutedPaginator };
