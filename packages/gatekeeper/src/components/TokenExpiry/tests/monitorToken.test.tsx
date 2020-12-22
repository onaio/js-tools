import store from '@onaio/connected-reducer-registry';
import reducerRegistry from '@onaio/redux-reducer-registry';
import session, { reducerName as sessionReducer, updateTokenExpired } from '@onaio/session-reducer';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ConnectedMonitorTokenExpiry, { MonitorTokenExpiry } from '../monitorToken';

reducerRegistry.register(sessionReducer, session);
const history = createBrowserHistory();
const redirectUrl = '/session/expired';

describe('/components/errors/Fallback', () => {
  it('renders without crasshing', () => {
    shallow(<MonitorTokenExpiry redirectUrl={redirectUrl} />);
  });

  it('render correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <MonitorTokenExpiry redirectUrl={redirectUrl} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render correctly when connected to store', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedMonitorTokenExpiry redirectUrl={redirectUrl} />
        </Router>
      </Provider>
    );
    expect(window.location.pathname).toEqual('/');
    // update token expiry status
    store.dispatch(updateTokenExpired(true));
    wrapper.update();

    expect(window.location.pathname).toEqual(redirectUrl);
  });
});
