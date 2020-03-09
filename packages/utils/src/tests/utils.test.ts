import { percentage } from '../utils';

describe('utils', () => {
  it('percentage works', () => {
    expect(percentage(0.18)).toEqual({
      error: null,
      value: '18%'
    });
    expect(percentage(0.187, 2)).toEqual({
      error: null,
      value: '18.70%'
    });
  });
});
