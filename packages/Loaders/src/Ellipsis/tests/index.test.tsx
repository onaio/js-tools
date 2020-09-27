import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import React from 'react';
import { Ellipsis } from '..';

describe('Loaders.Ellipsis', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Ellipsis />);

    expect(toJson(wrapper.find('Ellipsis'))).toMatchSnapshot();
  });
});
