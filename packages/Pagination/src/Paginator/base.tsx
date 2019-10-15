/** A bootstrap powered pagination component
 * inspired by https://scotch.io/tutorials/build-custom-pagination-with-react
 */
import React, { Fragment, MouseEvent, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { range } from './utils';

/** interface for argument passed to the opPageChange prop */
export interface PaginationData {
  currentPage: number;
  pageLimit: number;
  totalPages: number;
  totalRecords: number;
}

/** interface for Paginator props */
export interface PaginatorProps {
  totalRecords: number;
  pageLimit: number;
  pageNeighbours: number;
  onPageChange: (e: PaginationData) => void;
  ariaLabel?: string;
}

/** default props for paginator component */
const defaultPaginatorProps: PaginatorProps = {
  ariaLabel: 'page navigation',
  onPageChange: f => f,
  pageLimit: 30,
  pageNeighbours: 2,
  totalRecords: 0
};

/** the pagination component */
const Paginator = (props: PaginatorProps) => {
  const { totalRecords, pageLimit, pageNeighbours, ariaLabel, onPageChange } = props;

  let totalPages = 0;

  const [currentPage, setCurrentPage] = useState<number>(1);
  // pageNeighbours can be in [0, 1, 2, 3, 4, 5]
  const neighbourPillsNum = Math.max(0, Math.min(pageNeighbours, 5));

  totalPages = Math.ceil(totalRecords / pageLimit);

  const pages = fetchPageNumbers(neighbourPillsNum, totalPages, currentPage);
  // click handlers

  /** click Handler; registers the number of the clicked pagination Item
   * handles click event
   * @param {number} - number of the clicked plaginationItem
   * @return {(e: MouseEvent) => void }
   */
  const handleClick = (page: number) => (e: MouseEvent) => {
    e.preventDefault();
    gotoPage(page);
  };

  /** click handler for when user clicks on previous
   * @param {MouseEvent} e - MouseEvent
   */
  const handleMoveLeft = (e: MouseEvent) => {
    e.preventDefault();
    gotoPage(currentPage - 1);
  };

  /** click handler for when user clicks on next
   * @param {MouseEvent} e - MouseEvent
   */
  const handleMoveRight = (e: MouseEvent) => {
    e.preventDefault();
    gotoPage(currentPage + 1);
  };

  /** called when user click on a certain pagination item
   * calls the onPageChange handler
   * @param {number} page -  the number of the page clicked
   */
  const gotoPage = (page: number) => {
    const thisPage = Math.max(1, Math.min(page, totalPages));
    const paginationData = {
      currentPage: thisPage,
      pageLimit,
      totalPages,
      totalRecords
    };
    onPageChange(paginationData);
    setCurrentPage(thisPage);
  };

  return (
    <Fragment>
      <Pagination aria-label={ariaLabel} size="sm">
        <PaginationItem className={`page-item ${currentPage > 1 ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label="Previous"
            onClick={handleClick(1)}
          >
            <span aria-hidden="true">start</span>
            <span className="sr-only">Start</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={`page-item ${currentPage > 1 ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label="Previous"
            onClick={handleMoveLeft}
          >
            <span aria-hidden="true">previous</span>
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {pages.map((page, index) => {
          return (
            <PaginationItem
              key={index}
              className={`page-item ${currentPage === page ? ' active' : ''}`}
            >
              <PaginationLink className="page-link" href="#" onClick={handleClick(page as number)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem className={`page-item  ${currentPage < totalPages ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label="Next"
            onClick={handleMoveRight}
          >
            <span aria-hidden="true">next</span>
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={`page-item ${currentPage < totalPages ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link ${currentPage < totalPages ? '' : 'disabled'}`}
            href="#"
            aria-label="Previous"
            onClick={handleClick(totalPages)}
          >
            <span aria-hidden="true">end</span>
            <span className="sr-only">End</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Fragment>
  );
};

// helper && utilities

/** Let's say we have 10 pages and we set neighbourPillsNum to 2
 * Given that the current page is 6
 * The pagination control will look like the following:
 *
 * (start) previous {4 5} [6] {7 8} next (end)
 *
 * (x) => terminal pages: first and last page(always visible)
 * [x] => represents current page
 * {...x} => represents page neighbours
 *
 * @param {number} neighbourPillsNum - the max number of links/pills on either side of current page
 * @param {number} totalPages - the total number of pages
 * @param {number} currentPage - the currently selected page
 * @return {number []} - Array of numbers that will form the pills between previous and next
 */
export const fetchPageNumbers = (
  neighbourPillsNum: number,
  totalPages: number,
  currentPage: number
) => {
  const startPage = Math.max(1, currentPage - neighbourPillsNum);
  const endPage = Math.min(totalPages + 1, currentPage + neighbourPillsNum + 1);

  const numberedPages: number[] = range(startPage, endPage);

  return numberedPages;
};

Paginator.defaultProps = defaultPaginatorProps;

export { Paginator };
