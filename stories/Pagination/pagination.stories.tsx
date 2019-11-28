import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import notes from '../../packages/Pagination/README.md';
import { usePagination } from '../../packages/Pagination/src';

const bootstrapPaginatorProps = `const aLotOfRecords: PaginatorProps = {
    pageSize: 100,
    pageNeighbors: 3,
    totalRecords: 300000
  }

  `;

storiesOf('Paginator', module)
  .add(
    'bootstrap sample',
    () => {
      const Page = () => {
        const options = { totalRecords: 300000, pageSize: 100, pageNeighbors: 3 };
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
          <Fragment>
            <div>
              <h2> The props </h2>
              <pre>{bootstrapPaginatorProps}</pre>

              <br />
              <h3>The rendered component</h3>
              <br />
              <p>Currently selected page: {`${paginationState.currentPage}`}</p>
            </div>
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
              {paginationState.pagesToBeDisplayed.map((page, index) => {
                return (
                  <PaginationItem
                    key={index}
                    className={`page-item ${paginationState.currentPage === page ? ' active' : ''}`}
                  >
                    {/*  tslint:disable-next-line: jsx-no-lambda */}
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
          </Fragment>
        );
      };

      return <Page />;
    },
    { notes }
  )
  .add(
    'custom pagination',
    () => {
      const Page = () => {
        const options = { totalRecords: 300000, pageSize: 100, pageNeighbors: 3 };
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
          <>
            <div>
              <h2> The props </h2>
              <pre>{bootstrapPaginatorProps}</pre>

              <br />
              <h3>The rendered component</h3>
              <br />
              <p>Currently selected page: {`${paginationState.currentPage}`}</p>
            </div>
            <div className="pagination">
              {/* tslint:disable-next-line: jsx-no-lambda */}
              <button onClick={() => firstPage()} disabled={!canPreviousPage}>
                {'<<'}
              </button>{' '}
              {/* tslint:disable-next-line: jsx-no-lambda */}
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
              </button>{' '}
              {/* tslint:disable-next-line: jsx-no-lambda */}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>{' '}
              {/* tslint:disable-next-line: jsx-no-lambda */}
              <button onClick={() => lastPage()} disabled={!canNextPage}>
                {'>>'}
              </button>{' '}
              <span>
                Page{' '}
                <strong>
                  {paginationState.currentPage} of {paginationState.totalPages}
                </strong>{' '}
              </span>
              <span>
                | Go to page:{' '}
                <input
                  type="number"
                  defaultValue={paginationState.currentPage.toString()}
                  max={paginationState.totalPages}
                  min={1}
                  value={paginationState.currentPage}
                  // tslint:disable-next-line: jsx-no-lambda
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) : 1;
                    goToPage(page);
                  }}
                  style={{ width: '100px' }}
                />
              </span>{' '}
            </div>
          </>
        );
      };
      return <Page />;
    },
    { notes }
  );
