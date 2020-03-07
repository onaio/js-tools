import { Result } from './types';

/** Returns a decimal number as a percentage e.g. 0.18 becomes 18%
 * @param num - the decimal number you wish to turn into a percentage
 * @param decimalPoints - the number of decimal points to use
 * @returns { Result<string> } - A result object whose value is the percentage
 * as a string.
 */
export function percentage(num: number, decimalPoints: number = 0): Result<string> {
  return {
    error: null,
    value: `${(num * 100).toFixed(decimalPoints)}%`
  };
}
