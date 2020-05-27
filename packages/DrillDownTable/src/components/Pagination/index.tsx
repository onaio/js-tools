/** The default custom pagination component for drillDown v7  */
import { Dictionary } from '@onaio/utils';
import React from 'react';
import {
  NEXT,
  OF,
  PAGE,
  PAGE_SIZE_CATEGORIES,
  PREVIOUS,
  ROWS_TO_DISPLAY
} from '../../helpers/constants';
import { ActualTableInstanceProps } from '../TableJSX';
import './pagination.css';

/** interface describes props for Reveal Custom Pagination */
export interface PaginationProps<T extends object> extends ActualTableInstanceProps<T> {
  pageSizeCategories: number[] /** an array of page size options */;
  nextText: string;
  rowsToDisplayText: string;
  pageText: string;
  ofText: string;
  previousText: string;
}

/** default props for Reveal Pagination */
const defaultPaginationProps = {
  nextText: NEXT,
  ofText: OF,
  pageSizeCategories: PAGE_SIZE_CATEGORIES,
  pageText: PAGE,
  previousText: PREVIOUS,
  rowsToDisplayText: ROWS_TO_DISPLAY
};

/** Reveal pagination component */
function RevealPagination<T extends object = Dictionary>(props: PaginationProps<T>) {
  const {
    gotoPage,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    setPageSize,
    state: { pageSize, pageIndex },
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
      <span className="mr-2">{props.rowsToDisplayText}</span>
      <select className="page-sizes-select mr-4" value={pageSize} onChange={onChangePageSize}>
        {pageSizeCategories.map(pgSize => (
          <option key={pgSize} value={pgSize}>
            {pgSize}
          </option>
        ))}
      </select>
      <button className="mr-2" onClick={onClickPrevious} disabled={!canPreviousPage}>
        {props.previousText}
      </button>
      <span>
        {props.pageText} {'  '}
        <input
          type="text"
          value={pageIndex + 1}
          onChange={onChangePageIndex}
          style={{ width: '40px' }}
        />{' '}
        {props.ofText} {pageOptions.length}
      </span>
      <button className="ml-2" onClick={onClickNext} disabled={!canNextPage}>
        {props.nextText}
      </button>{' '}
    </div>
  );
}

RevealPagination.defaultProps = defaultPaginationProps;

export { RevealPagination };

/** default function that can be used as a render prop. to use a custom pagination
 * component, create a custom renderProp like this and return your custom pagination from within
 * @param {ActualTableInstanceProps<t>} props - the React table instance containing applied hooks.
 */
export const renderPaginationFun = <T extends object>(props: ActualTableInstanceProps<T>) => {
  return <RevealPagination {...props} />;
};
