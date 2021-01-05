import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { TokenExpired } from '../';

const history = createBrowserHistory();

describe('/components/errors/Fallback', () => {
  it('renders without crasshing', () => {
    shallow(<TokenExpired logoutUrl="/logout" />);
  });

  it('render correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <TokenExpired logoutUrl="/logout" />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h2').text()).toEqual(
      'Your session has expired. Please click the link below to log in again.'
    );
    expect(wrapper.find('Link').text()).toEqual('Renew session');

    expect(wrapper.find('a').length).toMatchInlineSnapshot(`1`);
  });
});
