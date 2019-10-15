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
