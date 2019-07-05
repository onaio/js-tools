import { getFormData } from '../utils';

describe('superset-connector/utils', () => {
  it('getFormData works correctly wiht row limit', async () => {
    expect(getFormData(2345)).toEqual({ row_limit: 2345 });
  });

  it('getFormData works correctly wiht ordering', async () => {
    expect(getFormData(2, [], { plan: true, goal: false })).toEqual({
      order_by_cols: ['["plan",+true]', '["goal",+false]'],
      row_limit: 2
    });
  });

  it('getFormData works correctly with SQL filters', async () => {
    expect(
      getFormData(1000, [{ sqlExpression: "plan_id+=+'10f9e9fa'+AND+goal_id+!=+'73'" }])
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

  it('getFormData works correctly with ad hoc filters', async () => {
    expect(
      getFormData(1000, [{ comparator: '10f9e9fa', operator: '==', subject: 'plan_id' }])
    ).toEqual({
      adhoc_filters: [
        {
          clause: 'WHERE',
          comparator: '10f9e9fa',
          expressionType: 'SIMPLE',
          operator: '==',
          subject: 'plan_id'
        }
      ],
      row_limit: 1000
    });
  });

  it('getFormData works correctly with everything altogether', async () => {
    expect(
      getFormData(
        3000,
        [
          { sqlExpression: "plan_id+=+'10f9e9fa'+AND+goal_id+!=+'73'" },
          { comparator: '10f9e9fa', operator: '==', subject: 'plan_id' }
        ],
        { gender: false }
      )
    ).toEqual({
      adhoc_filters: [
        {
          clause: 'WHERE',
          expressionType: 'SQL',
          sqlExpression: "plan_id+=+'10f9e9fa'+AND+goal_id+!=+'73'"
        },
        {
          clause: 'WHERE',
          comparator: '10f9e9fa',
          expressionType: 'SIMPLE',
          operator: '==',
          subject: 'plan_id'
        }
      ],
      order_by_cols: ['["gender",+false]'],
      row_limit: 3000
    });
  });
});
