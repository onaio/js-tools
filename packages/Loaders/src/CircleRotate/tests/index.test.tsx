import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import React from 'react';

import { CircleRotate } from '..';

describe('Loaders.CircleRotate', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<CircleRotate />);

    expect(toJson(wrapper.find('CircleRotate'))).toMatchSnapshot();
  });
});
