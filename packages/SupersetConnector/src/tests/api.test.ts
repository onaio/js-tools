import { apiRequest } from '../api';
import { getFormData } from '../utils';

describe('superset-connector/api', () => {
  it('apiRequest constructs default url correctly', async () => {
    const request = apiRequest({ params: 'foo=bar', token: 'hhh' }, new Headers());
    expect(request.url).toEqual('onadata?foo=bar');
  });

  it('apiRequest constructs url correctly with getFormData', async () => {
    const request = apiRequest(
      {
        params: `form_data=${JSON.stringify(
          getFormData(
            100,
            [
              {
                comparator: '10f9e9fa-ce34-4b27-a961-72fab5206ab6',
                operator: '==',
                subject: 'plan_id'
              }
            ],
            { plan_id: true, goal_id: false }
          )
        )}`,
        token: 'hhh'
      },
      new Headers()
    );
    expect(request.url).toEqual(
      'onadata?form_data=%7B%22adhoc_filters%22:[%7B%22clause%22:%22WHERE%22,%22expressionType%22:%22SIMPLE%22,%22comparator%22:%2210f9e9fa-ce34-4b27-a961-72fab5206ab6%22,%22operator%22:%22==%22,%22subject%22:%22plan_id%22%7D],%22order_by_cols%22:[%22[%5C%22plan_id%5C%22,+true]%22,%22[%5C%22goal_id%5C%22,+false]%22],%22row_limit%22:100%7D'
    );
  });
});
