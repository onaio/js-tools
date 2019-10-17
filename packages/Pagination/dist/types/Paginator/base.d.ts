/// <reference types="react" />
/** interface for argument passed to the opPageChange prop */
export interface PaginationData {
  currentPage: number;
  pageLimit: number;
  totalPages: number;
  totalRecords: number;
}
/** interface for Paginator props */
export interface BasePaginatorProps {
  ariaLabel?: string;
  currentPage: number;
  endLabel: string;
  nextLabel: string;
  pageChangeHandler: (e: PaginationData) => void;
  pageLimit: number;
  pageNeighbours: number;
  previousLabel: string;
  startLabel: string;
  totalRecords: number;
}
/** default props for paginator component */
export declare const defaultBasePaginatorProps: BasePaginatorProps;
/** the pagination component */
declare const BasePaginator: {
  (props: BasePaginatorProps): JSX.Element;
  defaultProps: BasePaginatorProps;
};
export { BasePaginator };
