import { mount } from 'enzyme';
import React from 'react';
import { renderPaginationFun } from '../pagination';
/** integration tests reside will reside in the drilldown's test folder */
describe('src/components/Table/Drilldown/helpers/pagination', () => {
  it('renders without crashing', () => {
    const props = {
      canNextPage: true,
      canPreviousPage: false,
      nextPage: jest.fn(),
      pageIndex: 0,
      pageOptions: { length: 20 },
      pageSize: 20,
      previousPage: jest.fn(),
      setPageSize: jest.fn()
    };
    mount(<>{renderPaginationFun(props as any)}</>);
  });
});
