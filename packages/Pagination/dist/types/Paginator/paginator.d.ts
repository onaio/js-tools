/// <reference types="react" />
import { PaginationData } from './base';
/** interface for Paginator props */
export interface PaginatorProps {
  ariaLabel?: string;
  endLabel: string;
  nextLabel: string;
  onPageChange: (e: PaginationData) => void;
  pageLimit: number;
  pageNeighbours: number;
  previousLabel: string;
  startLabel: string;
  totalRecords: number;
}
/** the pagination component */
declare const Paginator: {
  (props: PaginatorProps): JSX.Element;
  defaultProps: PaginatorProps;
};
export { Paginator, PaginationData };
