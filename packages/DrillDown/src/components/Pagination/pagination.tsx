/** The default custom pagination component for drillDown v7  */
import { Dictionary } from '@onaio/utils';
import React from 'react';
import { NEXT, OF, PAGE, PREVIOUS, ROWS_TO_DISPLAY } from '../../helpers/constants';
import { RenderPaginationOptions } from '../TableJSX';
import './pagination.css';

/** interface describes props for Reveal Custom Pagination */
export interface PaginationProps<T extends object> extends RenderPaginationOptions<T> {
  pageSizeCategories: number[] /** an array of page size options */;
}

/** default props for Reveal Pagination */
const defaultPaginationProps = {
  pageSizeCategories: [10, 20, 30, 50]
};

/** Reveal pagination component */
function RevealPagination<T extends object = Dictionary>(props: PaginationProps<T>) {
  const {
    gotoPage,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize,
    pageSizeCategories
  } = props;

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };
  const onClickPrevious = () => {
    previousPage();
  };
  const onChangePageIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    gotoPage(page);
  };
  const onClickNext = () => {
    nextPage();
  };

  return (
    <div className="pagination">
      <span className="mr-2">{ROWS_TO_DISPLAY}</span>
      <select className="page-sizes-select mr-4" value={pageSize} onChange={onChangePageSize}>
        {pageSizeCategories.map(pgSize => (
          <option key={pgSize} value={pgSize}>
            {pgSize}
          </option>
        ))}
      </select>
      <button className="mr-2" onClick={onClickPrevious} disabled={!canPreviousPage}>
        {PREVIOUS}
      </button>
      <span>
        {PAGE} {'  '}
        <input
          type="text"
          value={pageIndex + 1}
          onChange={onChangePageIndex}
          style={{ width: '40px' }}
        />{' '}
        {OF} {pageOptions.length}
      </span>
      <button className="ml-2" onClick={onClickNext} disabled={!canNextPage}>
        {NEXT}
      </button>{' '}
    </div>
  );
}

RevealPagination.defaultProps = defaultPaginationProps;

export { RevealPagination };

/** function that can be used as a render prop */
export const renderPaginationFun = <T extends object>(props: RenderPaginationOptions<T>) => {
  return <RevealPagination {...props} />;
};
