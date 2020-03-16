import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory, Location } from 'history';
import React from 'react';
import GoogleAnalytics from 'react-ga';
import { Router } from 'react-router';
import RouteTracker, { GARoute } from '..';
import { Dimensions } from './../../../helpers';

const history = createBrowserHistory();

describe('/components/GARoute', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const dimensions: Dimensions = {
    env: 'test',
    username: 'superman'
  };
  const location: Location = {
    hash: undefined,
    pathname: '/home',
    search: '?foo=bar',
    state: undefined
  };
  const props = {
    dimensions,
    history,
    location,
    match: {
      isExact: true,
      params: {},
      path: '/home',
      url: '/home'
    }
  };

  it('renders correctly without crashing', () => {
    GoogleAnalytics.pageview = jest.fn();
    const wrapper = mount(<GARoute {...props} />);
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(GoogleAnalytics.pageview).toBeCalledWith('/home?foo=bar');
    wrapper.unmount();
  });

  it('tracks pageview if the component did not unmount and URL changes', () => {
    GoogleAnalytics.pageview = jest.fn();
    const wrapper = mount(<GARoute {...props} />);
    wrapper.setProps({
      location: {
        ...props.location,
        search: '?foo=baz'
      }
    });
    expect(GoogleAnalytics.pageview).toBeCalledWith('/home?foo=baz');
  });

  it('renders the route tracker correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <RouteTracker />
      </Router>
    );
    expect(toJson(wrapper.find('RouteTracker'))).toMatchSnapshot();
  });
});
