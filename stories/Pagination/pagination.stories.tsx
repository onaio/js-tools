import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import notes from '../../packages/Pagination/README.md';
import {
  PaginationData,
  Paginator,
  PaginatorProps,
  RoutedPaginator
} from '../../packages/Pagination/src';

const aLotOfRecords: Partial<PaginatorProps> = {
  ariaLabel: 'pagination demo for a lot of pages',
  onPageChange: data => alert(`clicked page no ${data.currentPage}`),
  pageLimit: 100,
  pageNeighbours: 4,
  totalRecords: 300000
};

const manyRecordsDisplayCode = `const aLotOfRecords: PaginatorProps = {
    ariaLabel: 'pagination demo for a lot of pages',
    onPageChange: data => {}, // do something with selected page data
    pageLimit: 100,
    pageNeighbours: 4,
    totalRecords: 300000
  }


  Paginator {...aLotOfRecords}
  `;

storiesOf('Paginator', module)
  .add('with default settings', () => <Paginator />, { notes })
  .add(
    'Alot of records',
    () => {
      const Component = (props: any) => {
        const [pageNumber, setPageNumber] = React.useState<number>(1);
        const onPageChange = (data: PaginationData) => setPageNumber(data.currentPage);

        const paginatorProps = {
          ...aLotOfRecords,
          onPageChange
        };

        return (
          <div>
            <h2> The props </h2>
            <pre>{manyRecordsDisplayCode}</pre>

            <br />
            <h3>The rendered component</h3>
            <br />
            <p>Currently selected page: {`${pageNumber}`}</p>
            <Paginator {...paginatorProps} />
          </div>
        );
      };
      return <Component />;
    },
    { notes }
  )
  .add(
    'routed Paginator under default conditions',
    () => {
      return (
        <Router history={createBrowserHistory()}>
          <RoutedPaginator />
        </Router>
      );
    },
    { notes }
  );
