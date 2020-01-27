import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import OauthLogin, { AuthorizationGrantType } from '../login';
import * as fixtures from './fixtures';

describe('gatekeeper/OauthLogin', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      providers: fixtures.providers
    };
    shallow(<OauthLogin {...props} />);
  });

  it('renders correctly', () => {
    const props = {
      providers: fixtures.providers
    };
    const wrapper = mount(<OauthLogin {...props} />);
    expect(wrapper.text()).toMatchInlineSnapshot(
      `"Please log in with one of the following providersonadata"`
    );
    wrapper.unmount();
  });

  it('renders correct links for implicit authorization grant flow', () => {
    const props = {
      authorizationGrantType: AuthorizationGrantType.IMPLICIT,
      providers: fixtures.providers
    };
    const wrapper = mount(<OauthLogin {...props} />);
    expect(toJson(wrapper.find('a'))).toMatchSnapshot(`implicit authorization grant`);
    wrapper.unmount();
  });

  it('renders correct links for Authorization code-authorization grant flow', () => {
    const props = {
      authorizationGrantType: AuthorizationGrantType.AUTHORIZATION_CODE,
      providers: fixtures.providers
    };
    const wrapper = mount(<OauthLogin {...props} />);
    expect(toJson(wrapper.find('a'))).toMatchSnapshot(`Authorization code authorization grant`);
    wrapper.unmount();
  });

  it('renders correctly with custom ProviderLinksComponent', () => {
    const CustomProviderLinks = () => {
      return (
        <div className="danger">
          <p className="closed">oops!</p>
        </div>
      );
    };

    const props = {
      ProviderLinksComponent: CustomProviderLinks,
      providers: fixtures.providers
    };
    const wrapper = mount(<OauthLogin {...props} />);
    expect(toJson(wrapper.find('.danger'))).toMatchSnapshot('custom provider link');
    wrapper.unmount();
  });

  it('renders correctly with no providers', () => {
    const props = {
      providers: undefined
    };
    const wrapper = mount(<OauthLogin {...props} />);
    expect(wrapper.text().includes('No Providers')).toBeTruthy();
    wrapper.unmount();
  });

  it('renders correctly with no ProviderLinksComponent', () => {
    const props = {
      ProviderLinksComponent: undefined,
      providers: fixtures.providers
    };
    const wrapper = mount(<OauthLogin {...props} />);
    expect(toJson(wrapper.find('.gatekeeper-login'))).toMatchSnapshot();
    wrapper.unmount();
  });
});
