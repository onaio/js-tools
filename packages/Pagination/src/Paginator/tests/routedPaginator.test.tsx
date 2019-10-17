import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { BasePaginator } from '../base';
import { RoutedPaginator } from '../routedPaginator';

const history = createBrowserHistory();

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
    const props = {
      history,
      match: {
        isExact: true,
        params: {
          tablePage: 2
        },
        path: '/records/:tablePage',
        url: '/records/2'
      },
      pageLimit: 30,
      totalRecords: 135
    };

    const wrapper = mount(
      <Router history={history}>
        <RoutedPaginator {...props} />
      </Router>
    );
    const basePaginatorWrapper = wrapper.find(BasePaginator);
    expect(toJson(basePaginatorWrapper)).toMatchSnapshot('base paginator');
  });

  it('passes corect page from url case 1', () => {
    const mock: any = jest.fn();
    const props = {
      history,
      location: mock,
      match: {
        isExact: true,
        params: {
          tablePage: 2
        },
        path: '/records/:tablePage',
        url: '/records/2'
      },
      pageLimit: 40,
      totalRecords: 135
    };
    const wrapper = mount(
      <Router history={history}>
        <RoutedPaginator {...props} />
      </Router>
    );
    const basePaginatorWrapper = wrapper.find(BasePaginator);
    expect(basePaginatorWrapper.props().currentPage).toEqual(2);
  });
});
