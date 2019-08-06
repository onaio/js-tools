import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import HeaderBreadcrumb from '../';

const history = createBrowserHistory();

describe('components/page/HeaderBreadcrumb', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      currentPage: {
        label: 'IRS',
        url: '/irs'
      },
      pages: [
        {
          label: 'Home',
          url: '/'
        }
      ]
    };
    shallow(
      <Router history={history}>
        <HeaderBreadcrumb {...props} />
      </Router>
    );
  });

  it('renders HeaderBreadcrumb correctly', () => {
    const props = {
      currentPage: {
        label: 'IRS',
        url: '/irs'
      },
      pages: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Programs',
          url: '/programs'
        },
        {
          label: 'Provinces',
          url: ''
        },
        {
          label: 'Disctricts'
        }
      ]
    };
    const wrapper = mount(
      <Router history={history}>
        <HeaderBreadcrumb {...props} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
