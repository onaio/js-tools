import { mount } from 'enzyme';
import { createBrowserHistory, Location } from 'history';
import React from 'react';
import GoogleAnalytics from 'react-ga';
import { WithGATracker } from '..';

const history = createBrowserHistory();

describe('components/WithGATracker', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const ComponentMock = () => <div>Is P=NP ?</div>;
  const location: Location = {
    hash: undefined,
    pathname: '/home',
    search: '?foo=bar',
    state: undefined
  };
  const props = {
    history,
    location,
    match: {
      isExact: true,
      params: {},
      path: '/home',
      url: '/home'
    }
  };

  it('wraps HOC if initialization is successful', () => {
    GoogleAnalytics.pageview = jest.fn();
    const WrappedComponent = WithGATracker(ComponentMock);
    const wrapper = mount(<WrappedComponent {...props} />);
    expect(wrapper.find('WithGATrackerHOC').exists).toBeTruthy();
    expect(GoogleAnalytics.pageview).toBeCalledWith('/home?foo=bar');
    wrapper.unmount();
  });

  it('tracks pageview if the component did not unmount and URL changes', () => {
    GoogleAnalytics.pageview = jest.fn();
    const WrappedComponent = WithGATracker(ComponentMock);
    const wrapper = mount(<WrappedComponent {...props} />);
    wrapper.setProps({
      location: {
        ...props.location,
        search: '?foo=baz'
      }
    });
    expect(GoogleAnalytics.pageview).toBeCalledWith('/home?foo=baz');
  });
});
