import session, { authenticateUser } from '@onaio/session-reducer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { FlushThunks } from 'redux-testkit';
import thunk from 'redux-thunk';
import ConnectedLogout from '../logout';

describe('gatekeeper/ConnectedLogout', () => {
  let flushThunks;
  let store: Store;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(combineReducers({ session }), applyMiddleware(flushThunks, thunk));
    jest.resetAllMocks();
  });

  it('renders the ConnectedLogout component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedLogout />
        </MemoryRouter>
      </Provider>
    );
    expect(toJson(wrapper.find('Connect(Logout)'))).toMatchSnapshot();
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
        <MemoryRouter>
          <ConnectedLogout />
        </MemoryRouter>
      </Provider>
    );
    expect(toJson(wrapper.find('Connect(Logout)'))).toMatchSnapshot();
    wrapper.unmount();
  });
});
