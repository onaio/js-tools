import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BootstrapPagination } from '../../packages/Pagination/examples/bootstrap';
import notes from '../../packages/Pagination/README.md';
import { usePagination } from '../../packages/Pagination/src';

const customPaginatorProps = `const aLotOfRecords: PaginatorProps = {
    pageSize: 100,
    totalRecords: 300000
  }
  `;

storiesOf('Paginator', module)
  .add(
    'bootstrap sample',
    () => {
      const props = {
        pageNeighbors: 3,
        pageSize: 30,
        totalRecords: 1000
      };
      return (
        <div style={{ margin: '10px 30px' }}>
          <BootstrapPagination {...props} />;
        </div>
      );
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
              <pre>{customPaginatorProps}</pre>

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
