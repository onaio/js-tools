import { getSupersetFormData } from '../utils';

describe('superset-connector/utils', () => {
  it('getSupersetFormData should work correctly', async () => {
    // test row_limit
    expect(getSupersetFormData(2345)).toEqual({ adhoc_filters: [], row_limit: 2345 });
  });
});
