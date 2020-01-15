/** creates a list of integers that fit in range subject to
 * range(x, y) <=> [x, y) ∈ Real numbers
 * @param {number} start - the lower bound number of the loop, if stop is not provided this is used as the upper bound
 * @param {number | null} stop - the upper bound number of the loop
 * @param {number} step - the interval between any 2 numbers in the interval
 */
export const range = (start: number, stop: number | null = null, step: number = 1) => {
  let begin: number = start;
  let end: number;
  if (stop == null) {
    begin = 0;
    end = start;
  } else {
    end = stop;
  }

  return Array(Math.ceil(Math.abs((end - begin) / step)))
    .fill(begin)
    .map((x, y) => x + y * step);
};

/** Let's say we have 10 pages and we set neighborPillsNum to 2
 * Given that the current page is 6
 * The pagination control will look like the following:
 *
 * (start) previous {4 5} [6] {7 8} next (end)
 *
 * (x) => terminal pages: first and last page(always visible)
 * [x] => represents current page
 * {...x} => represents page neighbors
 *
 * @param {number} totalRecords - the total number of pages
 * @param {number} neighborPillsNum - the max number of links/pills on either side of current page
 * @param {number} pageSize - size of a single page
 * @param {number} currentPage - the currently selected page
 * @return {number []} - Array of numbers that will form the pills between previous and next
 */
export const fetchPageNumbers = (
  totalRecords: number,
  neighborPillsNum: number,
  pageSize: number = 30,
  currentPage: number = 1
) => {
  const totalPages = Math.ceil(totalRecords / pageSize); // division by zero error

  const startPage = Math.max(1, currentPage - neighborPillsNum);
  const endPage = Math.min(totalPages + 1, currentPage + neighborPillsNum + 1);

  const numberedPages: number[] = range(startPage, endPage);

  return numberedPages;
};
