import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import React from 'react';
import { DualRing } from '..';

describe('Loaders.DualRing', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<DualRing />);

    expect(toJson(wrapper.find('DualRing'))).toMatchSnapshot();
  });
});
