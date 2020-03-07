import { Result } from './types';

/** Returns a number as a decimal e.g. 0.18 becomes 18% */
export function percentage(num: number, decimalPoints: number = 0): Result<string> {
  return {
    error: null,
    value: `${(num * 100).toFixed(decimalPoints)}%`
  };
}
