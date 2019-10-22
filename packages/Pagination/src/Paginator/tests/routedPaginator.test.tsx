import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';
import { BasePaginator } from '../base';
import { RoutedPaginator } from '../routedPaginator';

const history = createBrowserHistory();

const TestComponent = props => (
  <Switch>
    <Route
      exact={true}
      path="/records/:tablePage"
      // tslint:disable-next-line: jsx-no-lambda
      render={routeProps => <RoutedPaginator {...routeProps} {...props} />}
    />
  </Switch>
);

describe('packages/paginator/routedPaginator', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(
      <Router history={history}>
        <RoutedPaginator />
      </Router>
    );
  });

  it('renders correctly', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/records/2']}>
        <TestComponent />
      </MemoryRouter>
    );

    const basePaginatorWrapper = wrapper.find(BasePaginator);
    const PIWrapper = basePaginatorWrapper.find('PaginationItem');
    const paginationItemNum = PIWrapper.length;
    expect(paginationItemNum).toEqual(4);
    expect(PIWrapper.at(0).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(1).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(paginationItemNum - 1).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(paginationItemNum - 2).hasClass('disabled')).toBeTruthy();
    expect(toJson(PIWrapper.at(0))).toMatchSnapshot('Start page');
    expect(toJson(PIWrapper.at(1))).toMatchSnapshot('previous page');
    expect(toJson(PIWrapper.at(paginationItemNum - 1))).toMatchSnapshot('Next page');
    expect(toJson(PIWrapper.at(paginationItemNum - 2))).toMatchSnapshot('End page');
  });

  it('passes corect page from url', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/records/2']}>
        <TestComponent />
      </MemoryRouter>
    );
    const basePaginatorWrapper = wrapper.find(BasePaginator);
    expect(basePaginatorWrapper.props().currentPage).toEqual(2);
  });

  it('renders correctly; edge case where page is gt than actual pages', () => {
    const props = { totalRecords: 5 };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/records/2']}>
        <TestComponent {...props} />
      </MemoryRouter>
    );
    const basePaginatorWrapper = wrapper.find(BasePaginator);
    expect(basePaginatorWrapper.props().currentPage).toEqual(2);
    const PIWrapper = wrapper.find('PaginationItem');
    const paginationItemNum = PIWrapper.length;
    expect(paginationItemNum).toEqual(5);
    expect(PIWrapper.at(2).hasClass('active')).toBeTruthy();
  });

  it('clicking a page redirects to the correct page', () => {
    // 5 pages
    const props = { totalRecords: 135, pageLimit: 10 };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/records/2']}>
        <TestComponent {...props} />
      </MemoryRouter>
    );
    const PIWrapper = wrapper.find('PaginationItem');
    // expect(toJson(wrapper.find(BasePaginator))).toMatchSnapshot('8 !== 7')
    expect(PIWrapper.length).toEqual(8);

    // go to the 1st page
    PIWrapper.at(2)
      .find('PaginationLink a')
      .simulate('click');

    wrapper.update();

    // inspect the pathname entry of the current location.
    const routedPaginatorWrapper = wrapper.find(RoutedPaginator);
    expect((routedPaginatorWrapper.props() as any).location.pathname).toEqual('/records/1');
  });
});
