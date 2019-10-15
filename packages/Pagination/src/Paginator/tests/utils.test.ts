import { range } from '../utils';

describe('../utils', () => {
  it('range works correctly for nominal case', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(range(1, 5, 2)).toEqual([1, 3]);
    expect(range(0)).toEqual([]);
  });
});
