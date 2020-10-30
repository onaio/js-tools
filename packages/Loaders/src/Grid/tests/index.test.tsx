import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import React from 'react';

import { Grid } from '..';

describe('Loaders.Grid', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Grid />);

    expect(toJson(wrapper.find('Grid'))).toMatchSnapshot();
  });
});
