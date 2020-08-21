import { mount } from 'enzyme';
import React from 'react';
import { renderPaginationFun } from '..';
/** integration tests reside will reside in the drilldown's test folder */
describe('src/components/Table/Drilldown/helpers/pagination', () => {
  const props = {
    canNextPage: true,
    canPreviousPage: false,
    gotoPage: jest.fn(),
    nextPage: jest.fn(),
    pageOptions: [0, 1, 2, 3, 4, 5],
    previousPage: jest.fn(),
    setPageSize: jest.fn(),
    state: {
      pageIndex: 0,
      pageSize: 20
    }
  };

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    mount(<>{renderPaginationFun(props as any)}</>);
  });

  it('updates page number input correctly', () => {
    const wrapper = mount(<>{renderPaginationFun(props as any)}</>);
    // Initialized to 1
    expect(wrapper.find('input').props().value).toEqual('1');
    wrapper.find('input').simulate('change', { target: { value: '2' } });
    wrapper.update();
    expect(props.gotoPage).toHaveBeenCalledWith(1);
    expect(wrapper.find('input').props().value).toEqual('2');
  });

  it('renders page 1 if page input is invalid', () => {
    const wrapper = mount(<>{renderPaginationFun(props as any)}</>);
    // Test page number above max number
    wrapper.find('input').simulate('change', { target: { value: '7' } });
    wrapper.update();
    expect(props.gotoPage).toHaveBeenCalledWith(0);
    expect(wrapper.find('input').props().value).toEqual('1');
    // Test negative number
    wrapper.find('input').simulate('change', { target: { value: '-1' } });
    wrapper.update();
    expect(props.gotoPage).toHaveBeenCalledWith(0);
    expect(wrapper.find('input').props().value).toEqual('1');
    // Test string
    wrapper.find('input').simulate('change', { target: { value: 'hello world' } });
    wrapper.update();
    expect(props.gotoPage).toHaveBeenCalledWith(0);
    expect(wrapper.find('input').props().value).toEqual('1');
  });
});
