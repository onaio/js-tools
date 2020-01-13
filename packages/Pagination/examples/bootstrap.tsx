import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { InterActionType, PaginationOptions, PaginationState, usePagination } from '../src';
import { fetchPageNumbers } from './utils';

/** describes the properties that we are going to add to the usePagination's hook */
interface ExtendingOptions {
  fetchPagesToDisplay: typeof fetchPagesToDisplay;
  pageNeighbors: number;
  pagesToDisplay: number[];
}

/** custom reducer: adds some properties to state specific to bootstrap ie.
 *  adds the property `pagesToDisplay` to the state so that we can have a limited
 * number of pagination items displayed by the pagination component at any one time
 */
function bootstrapReducer(
  state: PaginationState<ExtendingOptions>,
  action: InterActionType<ExtendingOptions>
) {
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

/** interface for props to the BootstrapPagination component */
interface Props {
  totalRecords: number;
  pageSize: number;
  pageNeighbors: number;
}

/** sensible defaults?  */
const defaultProps: Props = {
  pageNeighbors: 3,
  pageSize: 30,
  totalRecords: 1000
};

/** a util function that takes in the usePagination returned state
 * and uses some of its properties to calculate the pagination pages
 * to be displayed based on the currently selected page
 */
const fetchPagesToDisplay = (state: PaginationState<ExtendingOptions>) => {
  const { totalRecords, pageNeighbors, pageSize, currentPage } = state;
  return fetchPageNumbers(totalRecords, pageNeighbors, pageSize, currentPage);
};

/** bootstrap-powered pagination component  */
const BootstrapPagination: React.FC<Props> = props => {
  const { totalRecords, pageSize, pageNeighbors } = props;

  const initialDisplayedPages = fetchPageNumbers(totalRecords, pageNeighbors, pageSize);

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
