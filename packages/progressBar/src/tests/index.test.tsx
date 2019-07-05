import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import ProgressBar from '../';

describe('components/progressBar', () => {
  it('renders without crashing', () => {
    shallow(<ProgressBar />);
  });

  it('renders correctly for the default props', () => {
    const wrapper = mount(<ProgressBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
  it('renders correctly for different sets of props', () => {
    const props = {
      decimalPoints: 0,
      height: '10px',
      lineColor: '#5269EB',
      lineColorThresholds: {
        green: 70,
        red: 0,
        yellow: 30
      },
      max: 100,
      min: 0
    };

    const wrapper = mount(<ProgressBar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
