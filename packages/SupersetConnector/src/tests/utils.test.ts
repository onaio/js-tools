import { getSupersetFormData } from '../utils';

describe('superset-connector/utils', () => {
  it('getSupersetFormData should work correctly', async () => {
    // test row_limit
    expect(getSupersetFormData(2345)).toEqual({ adhoc_filters: [], row_limit: 2345 });

    // test SQL filter
    expect(
      getSupersetFormData(1000, [{ sqlExpression: "plan_id+=+'10f9e9fa'+AND+goal_id+!=+'73'" }])
    ).toEqual({
      adhoc_filters: [
        {
          clause: 'WHERE',
          expressionType: 'SQL',
          sqlExpression: "plan_id+=+'10f9e9fa'+AND+goal_id+!=+'73'"
        }
      ],
      row_limit: 1000
    });
  });
});
