import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory, createLocation } from 'history';
import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router';
import { BrowserRouter, link, Router } from 'react-router-dom';
import { BasePaginator } from '../base';
import { RoutedPaginator } from '../routedPaginator';

const history = createBrowserHistory();

const TestComponent = props => (
  <Switch>
    <Route exact={true} path="/records/:tablePage" component={RoutedPaginator} />
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

  it('passes corect page from url case 1', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/records/2']}>
        <TestComponent />
      </MemoryRouter>
    );
    const basePaginatorWrapper = wrapper.find(BasePaginator);
    expect(basePaginatorWrapper.props().currentPage).toEqual(2);
  });

  it('passes corect page from url case 1', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/records/2']}>
        <TestComponent />
      </MemoryRouter>
    );
    const basePaginatorWrapper = wrapper.find(BasePaginator);
    expect(basePaginatorWrapper.props().currentPage).toEqual(2);
  });
});
