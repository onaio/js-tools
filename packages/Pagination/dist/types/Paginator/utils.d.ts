/** creates a list of integers that fit in range subject to
 * range(x, y) <=> [x, y) ∈ Real numbers
 * @param {number} start - the lower bound number of the loop, if stop is not provided this is used as the upper bound
 * @param {number | null} stop - the upper bound number of the loop
 * @param {number} step - the interval between any 2 numbers in the interval
 */
export declare const range: (start: number, stop?: number | null, step?: number) => any[];
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
export declare const fetchPageNumbers: (
  neighbourPillsNum: number,
  totalPages: number,
  currentPage: number
) => number[];
/** makes sure any received page number is within 1 through to totalPages
 * @param pageNumber - the selected page number
 * @param allPages -  the total number of pages
 */
export declare const sanitizeNumber: (pageNumber: number, allPages: number) => number;
