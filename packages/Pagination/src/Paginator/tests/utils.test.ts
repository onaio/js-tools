import { sanitizeNumber } from '../utils';

describe('../utils.sanitize number', () => {
  it('works for nominal case', () => {
    let result = sanitizeNumber(5, 89);
    expect(result).toEqual(5);
    result = sanitizeNumber(90, 89);
    expect(result).toEqual(89);
    result = sanitizeNumber(-1, 89);
    expect(result).toEqual(1);
  });
});
