import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';
import { PaginationData, Paginator, PaginatorProps } from '../../packages/Pagination/';
import notes from '../../packages/Pagination/README.md';

const aLotOfRecords: PaginatorProps = {
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
            <SyntaxHighlighter language="typescript" style={style}>
              {manyRecordsDisplayCode}
            </SyntaxHighlighter>

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
  );
