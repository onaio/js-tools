import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import React from 'react';

import { Ring } from '..';

describe('Loaders.Ring', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Ring />);

    expect(toJson(wrapper.find('Ring'))).toMatchSnapshot();
  });
});
