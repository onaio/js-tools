import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink, PaginationProps } from 'reactstrap';
import { InterActionType, PaginationOptions, PaginationState, usePagination } from '../src';
import { fetchPageNumbers } from './utils';

/** custom reducer: adds some properties to state specific to bootstrap */
export function bootstrapReducer(state: PaginationState, action: InterActionType) {
  switch (action.type) {
    case 'TO_PAGE':
      return {
        ...action.changes,
        pagesToDisplay: action.changes.fetchPagesToDisplay(action.changes)
      };
    default:
      return {
        ...action.changes,
        pagesToDisplay: action.changes.fetchPagesToDisplay(action.changes)
      };
  }
}

export interface Props {
  totalRecords: number;
  pageSize: number;
  pageNeighbors: number;
}

const defaultProps: Props = {
  pageNeighbors: 3,
  pageSize: 30,
  totalRecords: 1000
};

const fetchPagesToDisplay = (state: any) => {
  const { totalRecords, pageNeighbors, pageSize, currentPage } = state;
  return fetchPageNumbers(totalRecords, pageNeighbors, pageSize, currentPage);
};

/** bootstrap-powered pagination component  */
const BootstrapPagination: React.FC<Props> = props => {
  const { totalRecords, pageSize, pageNeighbors } = props;

  const initialDisplayedPages = fetchPageNumbers(totalRecords, pageNeighbors, pageSize);

  interface ExtendingOptions {
    fetchPagesToDisplay: typeof fetchPagesToDisplay;
    pageNeighbors: number;
    pagesToDisplay: number[];
  }

  const options: PaginationOptions<ExtendingOptions> = {
    initialState: {
      fetchPagesToDisplay,
      pageNeighbors,
      pagesToDisplay: initialDisplayedPages
    },
    pageSize,
    reducer: bootstrapReducer,
    totalRecords
  };

  const {
    paginationState,
    nextPage,
    firstPage,
    lastPage,
    goToPage,
    previousPage,
    canNextPage,
    canPreviousPage
  } = usePagination(options);

  return (
    <React.Fragment>
      <Pagination aria-label="pagination" size="sm">
        <PaginationItem className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label="Start"
            // tslint:disable-next-line: jsx-no-lambda
            onClick={() => firstPage()}
          >
            <span aria-hidden="true">Start</span>
            <span className="sr-only">Start</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label="Previous"
            // tslint:disable-next-line: jsx-no-lambda
            onClick={() => previousPage()}
          >
            <span aria-hidden="true">Previous</span>
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {paginationState.pagesToDisplay.map((page: any, index: number) => {
          return (
            <PaginationItem
              key={index}
              className={`page-item ${paginationState.currentPage === page ? ' active' : ''}`}
            >
              {/* tslint:disable-next-line:jsx-no-lambda */}
              <PaginationLink className="page-link" href="#" onClick={() => goToPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem className={`page-item  ${canNextPage ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label={'Next'}
            // tslint:disable-next-line: jsx-no-lambda
            onClick={() => nextPage()}
          >
            <span aria-hidden="true">Next</span>
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={`page-item ${canNextPage ? '' : 'disabled'}`}>
          <PaginationLink
            href="#"
            aria-label="Last"
            // tslint:disable-next-line: jsx-no-lambda
            onClick={() => lastPage()}
          >
            <span aria-hidden="true">Last</span>
            <span className="sr-only">Last</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </React.Fragment>
  );
};

BootstrapPagination.defaultProps = defaultProps;

export { BootstrapPagination };
