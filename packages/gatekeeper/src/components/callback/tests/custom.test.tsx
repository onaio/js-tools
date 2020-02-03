import store from '@onaio/connected-reducer-registry';
import reducerRegistry from '@onaio/redux-reducer-registry';
import session, {
  authenticateUser,
  logOutUser,
  reducerName as sessionReducer
} from '@onaio/session-reducer';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import React from 'react';
import { Provider } from 'react-redux';
import gatekeeper, {
  recordResult,
  reducerName as gateKeeperReducer
} from '../../../ducks/gatekeeper';
import * as helperFixtures from '../../../helpers/tests/fixtures';
import * as callback from '../custom';

const ConnectedAPICallback = callback.default;
const APICallback = callback.APICallback;

reducerRegistry.register(sessionReducer, session);
reducerRegistry.register(gateKeeperReducer, gatekeeper);

describe('gatekeeper/custom/APICallback', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetchMock.restore();
  });

  it('renders without crashing', () => {
    fetchMock.getOnce('http://example.com', JSON.stringify(helperFixtures.expressAPIResponse));
    const props = {
      apiURL: 'http://example.com',
      authSuccess: true,
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      sessionData: {},
      sessionUser: {
        email: '',
        gravatar: '',
        name: '',
        username: ''
      }
    };
    shallow(<APICallback {...props} />);
  });

  it('renders correctly', () => {
    fetchMock.getOnce('http://example.com', JSON.stringify(helperFixtures.expressAPIResponse));
    const props = {
      apiURL: 'http://example.com',
      authSuccess: true,
      authenticateActionCreator: authenticateUser,
      authenticated: true,
      sessionData: helperFixtures.onadataSession,
      sessionUser: helperFixtures.onadataUser
    };
    store.dispatch(logOutUser());
    const wrapper = mount(<APICallback {...props} />);
    expect(wrapper.find('SuccessfulLogin').props()).toEqual({
      extraData: helperFixtures.OAuthExtradata,
      user: helperFixtures.onadataUser
    });
    expect(toJson(wrapper.find('SuccessfulLogin div'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when loading', () => {
    fetchMock.getOnce('http://example.com', JSON.stringify(helperFixtures.expressAPIResponse));
    const props = {
      apiURL: 'http://example.com',
      authSuccess: null,
      authenticateActionCreator: authenticateUser,
      authenticated: true,
      sessionData: helperFixtures.onadataSession,
      sessionUser: helperFixtures.onadataUser
    };
    store.dispatch(logOutUser());
    const wrapper = mount(<APICallback {...props} />);
    expect(toJson(wrapper.find('RenderLoadingComponent'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when not authenticated', () => {
    fetchMock.getOnce('http://example.com', JSON.stringify(helperFixtures.expressAPIResponse));
    const props = {
      apiURL: 'http://example.com',
      authSuccess: true,
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      sessionData: helperFixtures.onadataSession,
      sessionUser: helperFixtures.onadataUser
    };
    store.dispatch(logOutUser());
    const wrapper = mount(<APICallback {...props} />);
    expect(toJson(wrapper.find('RenderErrorComponent'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('authenticationProgress is used correctly', async () => {
    store.dispatch(logOutUser());
    fetchMock.getOnce('http://example.com', JSON.stringify(helperFixtures.expressAPIResponse));
    const authenticationProgressMock = jest.fn();
    const props = {
      apiURL: 'http://example.com',
      authSuccess: true,
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      authenticationProgressCreator: authenticationProgressMock,
      sessionData: helperFixtures.onadataSession,
      sessionUser: helperFixtures.onadataUser
    };
    const wrapper = mount(<APICallback {...props} />);
    await new Promise(resolve => setImmediate(resolve));
    expect(authenticationProgressMock.mock.calls).toEqual([[true], [false]]);
    expect(authenticationProgressMock).toHaveBeenCalledTimes(2);
    wrapper.unmount();
  });

  it('renders correctly when connected to the redux store', () => {
    fetchMock.getOnce('http://example.com', JSON.stringify(helperFixtures.expressAPIResponse));
    const props = {
      apiURL: 'http://example.com'
    };

    const { authenticated, user, extraData } = helperFixtures.onadataSessionWithOauthData;
    store.dispatch(authenticateUser(authenticated, user, extraData));
    store.dispatch(recordResult(true, extraData));

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedAPICallback {...props} />
      </Provider>
    );

    expect(wrapper.find('SuccessfulLogin').props()).toEqual(helperFixtures.ImplicitOAuthData);
    expect(toJson(wrapper.find('SuccessfulLogin div'))).toMatchSnapshot();
    wrapper.unmount();
  });
});
