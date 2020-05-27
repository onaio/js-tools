import { mount } from 'enzyme';
import React from 'react';
import { renderPaginationFun } from '..';
/** integration tests reside will reside in the drilldown's test folder */
describe('src/components/Table/Drilldown/helpers/pagination', () => {
  it('renders without crashing', () => {
    const props = {
      canNextPage: true,
      canPreviousPage: false,
      nextPage: jest.fn(),
      pageOptions: { length: 20 },
      previousPage: jest.fn(),
      setPageSize: jest.fn(),
      state: {
        pageIndex: 0,
        pageSize: 20
      }
    };
    mount(<>{renderPaginationFun(props as any)}</>);
  });
});
