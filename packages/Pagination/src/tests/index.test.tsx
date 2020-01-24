// test the reducer first
import { mount, ReactWrapper, shallow } from 'enzyme';
import React from 'react';
import { PaginationOptions, usePagination } from '..';

/** interface for the state that is returned  by the hook. */
interface ReactWrapperWithHookState<T> extends ReactWrapper {
  getProps: () => T;
}

/** wrapper that allows us to test hook functionality
 * @param {(...args) => any} theHook - the hook to be tested
 * @param {} mountFunction - either of shallow or mount
 * @param {any} args - arguments to initialize the hook
 */
export default function HookWrapper<ExpectedState = any>(
  theHook,
  mountFunction,
  args
): ReactWrapperWithHookState<ExpectedState> {
  function WrappedHook() {
    const Output: React.FC<{ output: any }> = props => {
      return <></>;
    };
    const output = theHook(args);

    return <Output output={output} />;
  }

  const wrapper = mountFunction(<WrappedHook />);

  /** a getter function that allows us to peak into props returned
   * by the wrapped hook.
   */
  wrapper.getProps = () => wrapper.find('Output').props().output;

  return wrapper;
}

const options: PaginationOptions<{}> = {
  pageSize: 50,
  totalRecords: 300023
};

describe('works for initial render', () => {
  it('just works', () => {
    const wrapper = HookWrapper(usePagination, mount, options);

    const { canNextPage, canPreviousPage, paginationState: state } = wrapper.getProps();
    expect(canNextPage).toBeTruthy();
    expect(canPreviousPage).toBeFalsy();
    expect(state).toEqual({
      currentPage: 1,
      pageSize: 50,
      totalPages: 6001,
      totalRecords: 300023
    });
  });

  it('nextPage works', () => {
    const wrapper = HookWrapper(usePagination, mount, options);

    wrapper.getProps().nextPage();
    wrapper.update();

    const { canNextPage, canPreviousPage, paginationState: state } = wrapper.getProps();
    expect(canNextPage).toBeTruthy();
    expect(canPreviousPage).toBeTruthy();
    expect(state).toEqual({
      currentPage: 2,
      pageSize: 50,
      totalPages: 6001,
      totalRecords: 300023
    });
  });

  it('gotoPage works', () => {
    const wrapper = HookWrapper(usePagination, mount, options);

    wrapper.getProps().goToPage(15);
    wrapper.update();

    const { canNextPage, canPreviousPage, paginationState: state } = wrapper.getProps();
    expect(canNextPage).toBeTruthy();
    expect(canPreviousPage).toBeTruthy();
    expect(state).toEqual({
      currentPage: 15,
      pageSize: 50,
      totalPages: 6001,
      totalRecords: 300023
    });
  });

  it('firstPage works', () => {
    const wrapper = HookWrapper(usePagination, mount, options);

    wrapper.getProps().firstPage();
    wrapper.update();

    const { canNextPage, canPreviousPage, paginationState: state } = wrapper.getProps();
    expect(canNextPage).toBeTruthy();
    expect(canPreviousPage).toBeFalsy();
    expect(state).toEqual({
      currentPage: 1,
      pageSize: 50,
      totalPages: 6001,
      totalRecords: 300023
    });
  });

  it('lastPage works', () => {
    const wrapper = HookWrapper(usePagination, mount, options);

    wrapper.getProps().lastPage();
    wrapper.update();

    const { canNextPage, canPreviousPage, paginationState: state } = wrapper.getProps();
    expect(canNextPage).toBeFalsy();
    expect(canPreviousPage).toBeTruthy();
    expect(state).toEqual({
      currentPage: 6001,
      pageSize: 50,
      totalPages: 6001,
      totalRecords: 300023
    });
  });

  it('previousPage works', () => {
    const wrapper = HookWrapper(usePagination, mount, options);

    wrapper.getProps().goToPage(5);
    wrapper.update();
    wrapper.getProps().previousPage();
    wrapper.update();

    const { canNextPage, canPreviousPage, paginationState: state } = wrapper.getProps();
    expect(canNextPage).toBeTruthy();
    // expect(canPreviousPage).toBeTruthy();
    expect(state).toEqual({
      currentPage: 4,
      pageSize: 50,
      totalPages: 6001,
      totalRecords: 300023
    });
  });

  it('goToPage less than 1 is handled', () => {
    // should take you to the first page
    const wrapper = HookWrapper(usePagination, mount, options);

    wrapper.getProps().goToPage(-1);
    wrapper.update();

    const { canNextPage, canPreviousPage, paginationState: state } = wrapper.getProps();
    expect(canNextPage).toBeTruthy();
    expect(canPreviousPage).toBeFalsy();
    expect(state).toEqual({
      currentPage: 1,
      pageSize: 50,
      totalPages: 6001,
      totalRecords: 300023
    });
  });

  it('goToPage greater than totalPages is handled', () => {
    // this should take you to the last page.
    const wrapper = HookWrapper(usePagination, mount, options);

    wrapper.getProps().goToPage(9830920);
    wrapper.update();

    const { canNextPage, canPreviousPage, paginationState: state } = wrapper.getProps();
    expect(canNextPage).toBeFalsy();
    expect(canPreviousPage).toBeTruthy();
    expect(state).toEqual({
      currentPage: 6001,
      pageSize: 50,
      totalPages: 6001,
      totalRecords: 300023
    });
  });
});
