import session from '@onaio/session-reducer';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { FlushThunks } from 'redux-testkit';
import thunk from 'redux-thunk';
import ConnectedPrivateRoute, { PrivateRoute } from '../';

/** the test component */
const TestComponent = (props: { [key: string]: any }) => {
  return <span>{props.someProp}</span>;
};

describe('ConnectedPrivateRoute', () => {
  let flushThunks;
  let store: Store;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(combineReducers({ session }), applyMiddleware(flushThunks, thunk));
    jest.resetAllMocks();
  });

  it('renders without crashing when authenticated', () => {
    const props = {
      authenticated: true,
      component: TestComponent,
      disableLoginProtection: false,
      redirectPath: '/login',
      someProp: 'I love Oov' /** we want to test that this prop is passed onwards */,
      someProp2: 'hidden' /** we want to test that this prop is passed onwards */
    };
    // Date.now = jest.fn(() => 1482363367071);
    shallow(
      <MemoryRouter>
        <PrivateRoute {...props} />
      </MemoryRouter>
    );

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute {...props} />
      </MemoryRouter>
    );
    expect(wrapper.find('TestComponent').length).toEqual(1);
    /** We are matching only the span so that we dont deal with random generated
     * keys in the spanshot test
     */
    expect(toJson(wrapper.find('TestComponent span'))).toMatchSnapshot();
    expect(wrapper.find('TestComponent').props() as { [key: string]: any }).toMatchSnapshot({
      history: expect.any(Object),
      location: expect.any(Object),
      match: expect.any(Object)
    });
    wrapper.unmount();
  });

  it('renders without crashing when disableLoginProtection is true', () => {
    const props = {
      authenticated: true,
      component: TestComponent,
      disableLoginProtection: false,
      redirectPath: '/login',
      someProp: 'treasure island' /** we want to test that this prop is passed onwards */,
      someProp2: 'treasure' /** we want to test that this prop is passed onwards */
    };
    // Date.now = jest.fn(() => 1482363367071);
    shallow(
      <MemoryRouter>
        <PrivateRoute {...props} />
      </MemoryRouter>
    );

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute {...props} />
      </MemoryRouter>
    );
    expect(wrapper.find('TestComponent').length).toEqual(1);
    /** We are matching only the span so that we dont deal with random generated
     * keys in the spanshot test
     */
    expect(toJson(wrapper.find('TestComponent span'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders without crashing when not authenticated', () => {
    const props = {
      authenticated: false,
      component: TestComponent,
      disableLoginProtection: false,
      redirectPath: '/login'
    };
    shallow(
      <MemoryRouter>
        <PrivateRoute {...props} />
      </MemoryRouter>
    );

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('TestComponent').length).toEqual(0);
    expect(wrapper.find('PrivateRoute').length).toEqual(1);
    expect(toJson(wrapper.find('PrivateRoute'))).toMatchSnapshot();
    expect(wrapper.find('PrivateRoute').props()).toEqual(props);
    expect(toJson(wrapper.find('Redirect'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('works when connected to the redux store', () => {
    shallow(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedPrivateRoute />
        </MemoryRouter>
      </Provider>
    );

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedPrivateRoute />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('TestComponent').length).toEqual(0);
    expect(wrapper.find('PrivateRoute').length).toEqual(1);
    expect(toJson(wrapper.find('PrivateRoute'))).toMatchSnapshot();
    expect(wrapper.find('PrivateRoute').props() as any).toMatchSnapshot({
      dispatch: expect.any(Function)
    });
    expect(toJson(wrapper.find('Redirect'))).toMatchSnapshot();
    wrapper.unmount();
  });
});
