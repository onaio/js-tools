/// <reference types="react" />
/** interface for argument passed to the opPageChange prop */
export interface PaginationData {
    currentPage: number;
    pageLimit: number;
    totalPages: number;
    totalRecords: number;
}
/** interface for Paginator props */
export interface PaginatorProps {
    totalRecords: number;
    pageLimit: number;
    pageNeighbours: number;
    onPageChange: (e: PaginationData) => void;
    ariaLabel?: string;
}
/** the pagination component */
declare const Paginator: {
    (props: PaginatorProps): JSX.Element;
    defaultProps: PaginatorProps;
};
/** Let's say we have 10 pages and we set neighbourPillsNum to 2
 * Given that the current page is 6
 * The pagination control will look like the following:
 *
 * (start) previous {4 5} [6] {7 8} next (end)
 *
 * (x) => terminal pages: first and last page(always visible)
 * [x] => represents current page
 * {...x} => represents page neighbours
 *
 * @param {number} neighbourPillsNum - the max number of links/pills on either side of current page
 * @param {number} totalPages - the total number of pages
 * @param {number} currentPage - the currently selected page
 * @return {number []} - Array of numbers that will form the pills between previous and next
 */
export declare const fetchPageNumbers: (neighbourPillsNum: number, totalPages: number, currentPage: number) => number[];
export { Paginator };
