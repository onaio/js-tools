import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import React from 'react';
import { Facebook } from '..';

describe('Loaders.Facebook', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Facebook />);

    expect(toJson(wrapper.find('Facebook'))).toMatchSnapshot();
  });
});
