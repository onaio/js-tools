import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import OauthLogin, { ProviderLinks } from '../login';
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
    expect(toJson(wrapper)).toMatchSnapshot();
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
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
