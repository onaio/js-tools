/** The default custom pagination component for drillDown v7  */
import { Dictionary } from '@onaio/utils';
import React, { useEffect, useState } from 'react';
import {
  NEXT,
  OF,
  PAGE,
  PAGE_SIZE_CATEGORIES,
  PREVIOUS,
  ROWS_TO_DISPLAY
} from '../../helpers/constants';
import { DrillDownInstanceProps } from '../TableJSX';

/** interface describes props for Reveal Custom Pagination */
export interface PaginationProps<T extends object> extends DrillDownInstanceProps<T> {
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
function Pagination<T extends object = Dictionary>(props: PaginationProps<T>) {
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

  const [pageNumber, setPageNumber] = useState<string>('');

  useEffect(() => {
    setPageNumber(`${pageIndex + 1}`);
  }, [pageIndex]);

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };
  const onClickPrevious = () => {
    previousPage();
  };
  const onChangePageIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPageNumber = e.target.value;

    if (e.target.value) {
      const value = Number(e.target.value);
      const index = value ? (pageOptions.indexOf(value - 1) >= 0 ? value - 1 : 0) : 0;
      gotoPage(index);
      newPageNumber = `${index + 1}`;
    }

    setPageNumber(newPageNumber);
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
          value={pageNumber}
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

Pagination.defaultProps = defaultPaginationProps;

export { Pagination as RevealPagination };

/** default function that can be used as a render prop. to use a custom pagination
 * component, create a custom renderProp like this and return your custom pagination from within
 * @param {DrillDownInstanceProps<t>} props - the React table instance containing applied hooks.
 */
export const renderPaginationFun = <T extends object>(props: DrillDownInstanceProps<T>) => {
  return <Pagination {...props} />;
};
