import session, { authenticateUser, logOutUser } from '@onaio/session-reducer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Switch } from 'react-router';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { FlushThunks } from 'redux-testkit';
import thunk from 'redux-thunk';
import OauthLogin from '../login';
import ConnectedLogout, { Logout } from '../logout';
import * as fixtures from './fixtures';

/** the test Home component */
const HomeComponent = () => {
  return <div>Home</div>;
};

const App = props => (
  <Switch>
    <Route exact={true} path="/" component={HomeComponent} />
    {/* tslint:disable jsx-no-lambda */}
    <Route
      exact={true}
      path="/login"
      render={routeProps => <OauthLogin providers={fixtures.providers} {...routeProps} />}
    />
    {/** this is for testing the un-connected Logout component */}
    <Route exact={true} path="/signout" render={routeProps => <Logout {...props} />} />
    {/* tslint:enable jsx-no-lambda */}
    <Route exact={true} path="/logout" component={ConnectedLogout} />
  </Switch>
);

describe('gatekeeper/ConnectedLogout', () => {
  let flushThunks;
  let store: Store;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(combineReducers({ session }), applyMiddleware(flushThunks, thunk));
    jest.resetAllMocks();
  });

  it('works with its props as expected', () => {
    window.open = jest.fn();
    store.dispatch(logOutUser());
    // mock logoutActionCreator
    const mockLogoutActionCreator = jest.fn(() => ({
      type: ''
    }));
    const logoutFunctionMock = jest.fn().mockImplementation(() => null);
    const logoutProps = {
      logoutActionCreator: mockLogoutActionCreator,
      logoutFunction: logoutFunctionMock,
      redirectPath: '/'
    };
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signout']} initialIndex={0}>
          <App {...logoutProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(logoutFunctionMock).toBeCalledWith({
      logoutActionCreator: mockLogoutActionCreator,
      logoutFunction: logoutFunctionMock,
      redirectPath: '/'
    });
  });

  it('renders the ConnectedLogout component when logged out', () => {
    store.dispatch(logOutUser());
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/logout']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    /** check that a redirect happened */
    expect(wrapper.find('Router').prop('history')).toMatchSnapshot({
      entries: expect.any(Array),
      location: expect.objectContaining({
        hash: '',
        key: expect.any(String),
        pathname: '/login',
        search: '',
        state: undefined
      })
    });
    expect(toJson(wrapper.find('.gatekeeper-login'))).toMatchSnapshot('Gatekeeper logged out');
    wrapper.unmount();
  });

  it('renders the ConnectedLogout when logged in', () => {
    store.dispatch(
      authenticateUser(true, {
        email: 'bob@example.com',
        name: 'Bobbie',
        username: 'RobertBaratheon'
      })
    );
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/logout']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    /** check that a redirect happened */
    expect(wrapper.find('Router').prop('history')).toMatchSnapshot({
      entries: expect.any(Array),
      location: expect.objectContaining({
        hash: '',
        key: expect.any(String),
        pathname: '/login',
        search: '',
        state: undefined
      })
    });
    expect(toJson(wrapper.find('.gatekeeper-login'))).toMatchSnapshot('Gatekeeper logged in');
    wrapper.unmount();
  });
});
