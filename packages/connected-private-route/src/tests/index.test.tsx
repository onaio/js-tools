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

const disableRouteDefaultProps = {
  routerDisabledRedirectPath: '/',
  routerEnabled: true
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

    console.log(wrapper.debug());
    expect(wrapper.find('TestComponent').length).toEqual(1);
    /** We are matching only the span so that we dont deal with random generated
     * keys in the spanshot test
     */
    expect(toJson(wrapper.find('Routes span'))).toMatchSnapshot();
    expect(wrapper.find('TestComponent').props() as { [key: string]: any }).toMatchSnapshot({
      history: expect.any(Object),
      location: expect.any(Object),
      match: expect.any(Object)
    });
    wrapper.unmount();
  });

  // it('renders without crashing when disableLoginProtection is true', () => {
  //   const props = {
  //     authenticated: true,
  //     component: TestComponent,
  //     disableLoginProtection: false,
  //     redirectPath: '/login',
  //     someProp: 'treasure island' /** we want to test that this prop is passed onwards */,
  //     someProp2: 'treasure' /** we want to test that this prop is passed onwards */
  //   };

  //   shallow(
  //     <MemoryRouter>
  //       <PrivateRoute {...props} />
  //     </MemoryRouter>
  //   );

  //   const wrapper = mount(
  //     <MemoryRouter>
  //       <PrivateRoute {...props} />
  //     </MemoryRouter>
  //   );
  //   expect(wrapper.find('TestComponent').length).toEqual(1);
  //   /** We are matching only the span so that we dont deal with random generated
  //    * keys in the spanshot test
  //    */
  //   expect(toJson(wrapper.find('TestComponent span'))).toMatchSnapshot();
  //   expect(wrapper.find('TestComponent').props() as { [key: string]: any }).toMatchSnapshot({
  //     history: expect.any(Object),
  //     location: expect.any(Object),
  //     match: expect.any(Object)
  //   });
  //   wrapper.unmount();
  // });

  // it('renders without crashing when not authenticated', () => {
  //   const props = {
  //     authenticated: false,
  //     component: TestComponent,
  //     disableLoginProtection: false,
  //     location: {
  //       hash: '#howdy',
  //       pathname: '/dashboard',
  //       search: '?q=string',
  //       state: {}
  //     },
  //     path: '/',
  //     redirectPath: '/denied'
  //   };
  //   shallow(
  //     <MemoryRouter>
  //       <PrivateRoute {...props} />
  //     </MemoryRouter>
  //   );

  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/dashboard?q=string#howdy']} initialIndex={0}>
  //       <PrivateRoute {...props} />
  //     </MemoryRouter>
  //   );

  //   expect(wrapper.find('TestComponent').length).toEqual(0);
  //   expect(wrapper.find('PrivateRoute').length).toEqual(1);
  //   expect(toJson(wrapper.find('PrivateRoute'))).toMatchSnapshot();
  //   expect(wrapper.find('PrivateRoute').props()).toEqual({
  //     ...props,
  //     ...disableRouteDefaultProps
  //   });
  //   /** check that a redirect happened */
  //   expect(wrapper.find('Router').prop('history')).toMatchSnapshot({
  //     entries: expect.any(Array),
  //     location: expect.objectContaining({
  //       hash: '',
  //       key: expect.any(String),
  //       pathname: '/denied',
  //       search: '?next=%2Fdashboard%3Fq%3Dstring%23howdy',
  //       state: undefined
  //     })
  //   });
  //   wrapper.unmount();
  // });

  // it('constructs url to add to next searchParam correctly', () => {
  //   const props = {
  //     authenticated: false,
  //     component: TestComponent,
  //     disableLoginProtection: false,
  //     location: {
  //       hash: '#howdy',
  //       pathname: '/dashboard/hunter',
  //       search: '?q=string',
  //       state: {}
  //     },
  //     path: '/dashboard/:id',
  //     redirectPath: '/denied'
  //   };

  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/dashboard/hunter?q=string#howdy']} initialIndex={0}>
  //       <PrivateRoute {...props} />
  //     </MemoryRouter>
  //   );

  //   expect(wrapper.find('PrivateRoute').props()).toEqual({
  //     ...props,
  //     ...disableRouteDefaultProps
  //   });
  //   /** check that a redirect happened */
  //   expect(wrapper.find('Router').prop('history')).toMatchSnapshot({
  //     entries: expect.any(Array),
  //     location: expect.objectContaining({
  //       hash: '',
  //       key: expect.any(String),
  //       pathname: '/denied',
  //       search: '?next=%2Fdashboard%2Fhunter%3Fq%3Dstring%23howdy',
  //       state: undefined
  //     })
  //   });
  //   wrapper.unmount();
  // });

  // it('works when connected to the redux store', () => {
  //   shallow(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <ConnectedPrivateRoute />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
  //         <ConnectedPrivateRoute />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   expect(wrapper.find('TestComponent').length).toEqual(0);
  //   expect(wrapper.find('PrivateRoute').length).toEqual(1);
  //   expect(toJson(wrapper.find('PrivateRoute'))).toMatchSnapshot();
  //   expect(wrapper.find('PrivateRoute').props() as any).toMatchSnapshot({
  //     dispatch: expect.any(Function)
  //   });
  //   /** check that a redirect happened */
  //   expect(wrapper.find('Router').prop('history')).toMatchSnapshot({
  //     entries: expect.any(Array),
  //     location: expect.objectContaining({
  //       hash: '',
  //       key: expect.any(String),
  //       pathname: '/login',
  //       search: '?next=',
  //       state: undefined
  //     })
  //   });
  //   wrapper.unmount();
  // });

  // it('passes props forward connected to the redux store', () => {
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
  //         <ConnectedPrivateRoute
  //           message="what is dead may never die"
  //           path="/dashboard"
  //           disableLoginProtection={false}
  //           redirectPath="/denied"
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   expect(wrapper.find('PrivateRoute').props() as any).toMatchSnapshot({
  //     dispatch: expect.any(Function)
  //   });
  //   wrapper.unmount();
  // });

  // it('disableLoginProtection works with ConnectedPrivateRoute', () => {
  //   const props = {
  //     authenticated: false,
  //     component: TestComponent,
  //     disableLoginProtection: true,
  //     redirectPath: '/login',
  //     someProp: 'we do not sow'
  //   };

  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
  //         <ConnectedPrivateRoute {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //   expect(wrapper.find('TestComponent').length).toEqual(1);
  //   /** We are matching only the span so that we dont deal with random generated
  //    * keys in the spanshot test
  //    */
  //   expect(toJson(wrapper.find('TestComponent span'))).toMatchSnapshot();
  //   wrapper.unmount();
  // });

  // it('renders as expected when router is disabled', () => {
  //   const routerDisabledRedirectPath = '/route_disabled';
  //   const props = {
  //     authenticated: true,
  //     component: TestComponent,
  //     disableLoginProtection: true,
  //     location: {
  //       hash: '#howdy',
  //       pathname: '/dashboard',
  //       search: '?q=string',
  //       state: {}
  //     },
  //     path: '/',
  //     redirectPath: '/denied',
  //     routerDisabledRedirectPath,
  //     routerEnabled: false
  //   };
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/dashboard?q=string#howdy']} initialIndex={0}>
  //       <PrivateRoute {...props} />
  //     </MemoryRouter>
  //   );

  //   expect(wrapper.find('TestComponent').length).toEqual(0);
  //   expect(wrapper.find('PrivateRoute').length).toEqual(1);
  //   expect(wrapper.find('PrivateRoute').props()).toEqual({
  //     ...props,
  //     routerDisabledRedirectPath,
  //     routerEnabled: false
  //   });
  //   const router = wrapper.find('Router').props()
  //   console.log({router})
  //   /** check that a redirect happened */
  //   expect(wrapper.find('Router').prop('location')).toMatchSnapshot({
  //     entries: expect.any(Array),
  //     location: expect.objectContaining({
  //       hash: '',
  //       key: expect.any(String),
  //       pathname: routerDisabledRedirectPath,
  //       search: '',
  //       state: undefined
  //     })
  //   });
  //   wrapper.unmount();
  // });
});
