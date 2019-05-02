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
import gatekeeper, { recordResult, reducerName as gateKeeperReducer } from '../../ducks/gatekeeper';
import { getOnadataUserInfo } from '../../helpers/oauth';
import * as serviceHelpers from '../../helpers/services';
import * as helperFixtures from '../../helpers/tests/fixtures';
import * as callback from '../callback';
import * as fixtures from './fixtures';

const ConnectedOauthCallback = callback.default;
const OauthCallback = callback.OauthCallback;

const history = createBrowserHistory();
reducerRegistry.register(sessionReducer, session);
reducerRegistry.register(gateKeeperReducer, gatekeeper);

describe('gatekeeper/OauthCallback', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetchMock.restore();
  });

  it('renders without crashing', () => {
    fetchMock.getOnce(
      fixtures.providers.onadata.userUri,
      JSON.stringify(helperFixtures.onadataUser)
    );
    const props = {
      authSuccess: true,
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      history,
      location: {
        hash:
          '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc',
        pathname: '/oauth/callback/404/',
        search: '',
        state: undefined
      },
      match: {
        isExact: true,
        params: { id: '404' },
        path: 'https://example.com/oauth/callback/:id',
        url: 'https://example.com/oauth/callback/404/'
      },
      providers: fixtures.providers,
      sessionData: {},
      sessionUser: {
        email: '',
        gravatar: '',
        name: '',
        username: ''
      }
    };
    shallow(<OauthCallback {...props} />);
  });

  it('renders correctly when not loading', () => {
    fetchMock.getOnce(
      fixtures.providers.onadata.userUri,
      JSON.stringify(helperFixtures.onadataUser)
    );
    const props = {
      authSuccess: null,
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      history,
      location: {
        hash:
          '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc',
        pathname: '/oauth/callback/onadata/',
        search: '',
        state: undefined
      },
      match: {
        isExact: true,
        params: { id: 'onadata' },
        path: 'https://example.com/oauth/callback/:id',
        url: 'https://example.com/oauth/callback/onadata/'
      },
      providers: fixtures.providers,
      sessionData: {},
      sessionUser: {
        email: '',
        gravatar: '',
        name: '',
        username: ''
      }
    };

    store.dispatch(logOutUser());
    const wrapper = mount(<OauthCallback {...props} />);
    expect(toJson(wrapper.find('OauthCallback'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when not logged in', () => {
    fetchMock.getOnce(
      fixtures.providers.onadata.userUri,
      JSON.stringify(helperFixtures.onadataUser)
    );
    const props = {
      authSuccess: true,
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      history,
      location: {
        hash:
          '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc',
        pathname: '/oauth/callback/onadata/',
        search: '',
        state: undefined
      },
      match: {
        isExact: true,
        params: { id: 'onadata' },
        path: 'https://example.com/oauth/callback/:id',
        url: 'https://example.com/oauth/callback/onadata/'
      },
      providers: fixtures.providers,
      sessionData: {},
      sessionUser: {
        email: '',
        gravatar: '',
        name: '',
        username: ''
      }
    };

    store.dispatch(logOutUser());
    const mock = jest.spyOn(serviceHelpers, 'fetchUser');

    const wrapper = mount(<OauthCallback {...props} />);

    const { onadataAuth } = helperFixtures;
    const url = 'https://stage-api.ona.io/api/v1/user.json';
    const hash =
      '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc';

    expect(mock).toHaveBeenCalledWith(
      hash,
      url,
      onadataAuth,
      authenticateUser,
      recordResult,
      getOnadataUserInfo
    );

    expect(toJson(wrapper.find('OauthCallback'))).toMatchSnapshot();
    mock.mockRestore();
    wrapper.unmount();
  });

  it('renders correctly when logged in', () => {
    fetchMock.getOnce(
      fixtures.providers.onadata.userUri,
      JSON.stringify(helperFixtures.onadataUser)
    );
    const props = {
      history,
      location: {
        hash:
          '#access_token=iLoveOov&expires_in=36000&token_type=Bearer&scope=read+write&state=abc',
        pathname: '/oauth/callback/onadata/',
        search: '',
        state: undefined
      },
      match: {
        isExact: true,
        params: { id: 'onadata' },
        path: 'https://example.com/oauth/callback/:id',
        url: 'https://example.com/oauth/callback/onadata/'
      },
      providers: fixtures.providers
    };

    const { authenticated, user, extraData } = helperFixtures.onadataSessionWithOauthData;
    store.dispatch(authenticateUser(authenticated, user, extraData));
    store.dispatch(recordResult(true, extraData));

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedOauthCallback {...props} />
      </Provider>
    );

    expect(toJson(wrapper.find('OauthCallback'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when oAuth error occurred', () => {
    const props = {
      authSuccess: false,
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      history,
      location: {
        hash: '',
        pathname: '/oauth/callback/onadata/',
        search: '?error=unauthorized_client&state=abc',
        state: undefined
      },
      match: {
        isExact: true,
        params: { id: 'onadata' },
        path: 'https://example.com/oauth/callback/:id',
        url: 'https://example.com/oauth/callback/onadata/'
      },
      providers: fixtures.providers,
      sessionData: {},
      sessionUser: {
        email: '',
        gravatar: '',
        name: '',
        username: ''
      }
    };

    const wrapper = mount(<OauthCallback {...props} />);
    expect(toJson(wrapper.find('OauthCallback'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when uri cant be processed', () => {
    const props = {
      authSuccess: false,
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      history,
      location: {
        hash: '',
        pathname: '/oauth/callback/onadata/',
        search: '',
        state: undefined
      },
      match: {
        isExact: true,
        params: { id: 'onadata' },
        path: 'https://example.com/oauth/callback/:id',
        url: 'https://example.com/oauth/callback/onadata/'
      },
      providers: fixtures.providers,
      sessionData: {},
      sessionUser: {
        email: '',
        gravatar: '',
        name: '',
        username: ''
      }
    };

    const wrapper = mount(<OauthCallback {...props} />);
    expect(toJson(wrapper.find('OauthCallback'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when provider is not known', () => {
    const props = {
      authenticateActionCreator: authenticateUser,
      authenticated: false,
      history,
      location: {
        hash: '',
        pathname: '/oauth/callback/unknown/',
        search: '',
        state: undefined
      },
      match: {
        isExact: true,
        params: { id: 'unknown' },
        path: 'https://example.com/oauth/callback/:id',
        url: 'https://example.com/oauth/callback/unknown/'
      },
      providers: fixtures.providers,
      sessionData: {},
      sessionUser: {
        email: '',
        gravatar: '',
        name: '',
        username: ''
      }
    };

    const wrapper = mount(<OauthCallback {...props} />);
    expect(toJson(wrapper.find('OauthCallback'))).toMatchSnapshot();
    wrapper.unmount();
  });
});
