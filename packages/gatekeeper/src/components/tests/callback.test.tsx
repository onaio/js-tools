import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import { createBrowserHistory } from 'history';
import React from 'react';
import * as helperFixtures from '../../helpers/tests/fixtures';
import OauthCallback from '../callback';
import * as fixtures from './fixtures';

const history = createBrowserHistory();

describe('gatekeeper/OauthLogin', () => {
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
      providers: fixtures.providers
    };
    shallow(<OauthCallback {...props} />);
  });

  it('renders correctly', () => {
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
    const wrapper = mount(<OauthCallback {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
