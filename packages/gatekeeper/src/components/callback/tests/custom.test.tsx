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
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import gatekeeper, {
  recordResult,
  reducerName as gateKeeperReducer
} from '../../../ducks/gatekeeper';
import { getOnadataUserInfo } from '../../../helpers/oauth';
import * as serviceHelpers from '../../../helpers/services';
import * as helperFixtures from '../../../helpers/tests/fixtures';
import * as fixtures from '../../tests/fixtures';
import * as callback from '../custom';

const APICallback = callback.APICallback;

const history = createBrowserHistory();
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
    expect(toJson(wrapper.find('APICallback'))).toMatchSnapshot();
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
    expect(toJson(wrapper.find('APICallback'))).toMatchSnapshot();
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
    expect(toJson(wrapper.find('APICallback'))).toMatchSnapshot();
    wrapper.unmount();
  });
});
