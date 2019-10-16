/** Wraps basePagination to with an interface that allows the basePagination
 * to be used with clickHandlers.
 */
import React, { useState } from 'react';
import { BasePaginator, PaginationData } from './base';

/** interface for Paginator props */
export interface PaginatorProps {
  ariaLabel?: string;
  endLabel: string;
  nextLabel: string;
  onPageChange: (e: PaginationData) => void;
  pageLimit: number;
  pageNeighbours: number;
  previousLabel: string;
  startLabel: string;
  totalRecords: number;
}

/** default props for paginator component */
const defaultPaginatorProps: PaginatorProps = {
  ariaLabel: 'page navigation',
  endLabel: 'End',
  nextLabel: 'Next',
  onPageChange: f => f,
  pageLimit: 30,
  pageNeighbours: 2,
  previousLabel: 'Previous',
  startLabel: 'Start',
  totalRecords: 0
};

/** the pagination component */
const Paginator = (props: PaginatorProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // functions

  /** changeHandler that gets called when user clicks on paginationItem
   * This tracks the current page on behalf of basePaginator and also propagates
   * click changes to the calling component
   *
   * @param {PaginationData} paginationData - state of pagination component
   */
  const pageChangeHandler = (paginationData: PaginationData) => {
    props.onPageChange(paginationData);
    setCurrentPage(paginationData.currentPage);
  };

  /** const props for base paginator */
  const basePaginatorProps = {
    ...props,
    currentPage,
    pageChangeHandler
  };

  return <BasePaginator {...basePaginatorProps} />;
};

Paginator.defaultProps = defaultPaginatorProps;

export { Paginator };
