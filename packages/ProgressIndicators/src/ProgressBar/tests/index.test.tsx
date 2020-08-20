import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import ProgressBar from '../';
const RED = '#FF4136';
const YELLOW = '#FFFF00';
const BLUE = '#0000FF';
const GREY = '#dddddd';

describe('components/progressBar', () => {
  it('renders without crashing', () => {
    shallow(<ProgressBar />);
  });

  it('renders correctly for the default props', () => {
    const props = {
      value: 50
    };
    const wrapper = mount(<ProgressBar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.progress-bar').props().style).toMatchSnapshot({
      backgroundColor: '#0000FF',
      width: '50%'
    });
    expect(wrapper.find('.progress-bar').props()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly for this set of props', () => {
    const props = {
      decimalPoints: 0,
      height: '10px',
      lineColorThresholds: {
        GREEN_THRESHOLD: {
          color: '#2ECC40',
          name: 'Green',
          orEquals: true,
          value: 1
        },
        GREY_THRESHOLD: {
          color: '#dddddd',
          name: 'Grey',
          value: 0.2
        },
        RED_THRESHOLD: {
          color: '#FF4136',
          name: 'Red',
          orEquals: true,
          value: 0.75
        },
        YELLOW_THRESHOLD: {
          color: '#FFDC00',
          name: 'Yellow',
          value: 0.9
        }
      },
      max: 100,
      min: 0,
      value: 10
    };

    const wrapper = mount(<ProgressBar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.progress-bar').props().style).toMatchSnapshot({
      backgroundColor: GREY,
      width: '10%'
    });
    wrapper.unmount();
  });

  it('renders correctly if both lineColor and threshold are given', () => {
    const props = {
      decimalPoints: 0,
      height: '10px',
      lineColor: '#5269EB',
      lineColorThresholds: {
        GREEN_THRESHOLD: {
          color: '#2ECC40',
          name: 'Green',
          orEquals: true,
          value: 1
        },
        GREY_THRESHOLD: {
          color: '#dddddd',
          name: 'Grey',
          value: 0.2
        },
        RED_THRESHOLD: {
          color: '#FF4136',
          name: 'Red',
          orEquals: true,
          value: 0.75
        },
        YELLOW_THRESHOLD: {
          color: '#FFDC00',
          name: 'Yellow',
          value: 0.9
        }
      },
      max: 100,
      min: 0,
      value: 40
    };

    const wrapper = mount(<ProgressBar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.progress-bar').props().style).toMatchSnapshot({
      backgroundColor: RED,
      width: '40%'
    });
    wrapper.unmount();
  });

  it('renders correctly for different value', () => {
    const props = {
      decimalPoints: 0,
      height: '10px',
      lineColor: '#5269EB',
      lineColorThresholds: {
        GREEN_THRESHOLD: {
          color: '#2ECC40',
          name: 'Green',
          orEquals: true,
          value: 1
        },
        GREY_THRESHOLD: {
          color: '#dddddd',
          name: 'Grey',
          value: 0.2
        },
        RED_THRESHOLD: {
          color: '#FF4136',
          name: 'Red',
          orEquals: true,
          value: 0.75
        },
        YELLOW_THRESHOLD: {
          color: '#FFDC00',
          name: 'Yellow',
          value: 0.9
        }
      },
      max: 100,
      min: 0,
      value: 70
    };

    const wrapper = mount(<ProgressBar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.progress-bar').props().style).toMatchSnapshot({
      backgroundColor: RED,
      width: '70%'
    });
    wrapper.unmount();
  });

  it('uses lineColor if thresholds are not given', () => {
    const props = {
      decimalPoints: 0,
      height: '10px',
      lineColor: YELLOW,
      max: 100,
      min: 0,
      value: 70
    };

    const wrapper = mount(<ProgressBar {...props} />);
    expect(wrapper.find('.progress-bar').props().style).toMatchSnapshot({
      backgroundColor: YELLOW,
      width: '70%'
    });
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('how does it behave when there is no value', () => {
    const props = {
      decimalPoints: 0,
      height: '10px'
    };
    const wrapper = mount(<ProgressBar {...props} />);
    expect(wrapper.find('.progress-bar').props().style).toMatchSnapshot({
      backgroundColor: BLUE,
      width: '0%'
    });
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('when the label value is provided', () => {
    const props = {
      showLabel: true,
      value: 60
    };
    const wrapper = mount(<ProgressBar {...props} />);
    expect(wrapper.text()).toEqual('60%');
    wrapper.unmount();
  });

  it('renders a progress bar with strips', () => {
    const props = {
      stripped: true
    };
    const wrapper = mount(<ProgressBar {...props} />);
    expect(wrapper.find('.progress-bar-striped')).toMatchSnapshot();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders an animated progress bar', () => {
    const props = {
      anime: true
    };
    const wrapper = mount(<ProgressBar {...props} />);
    expect(wrapper.find('.progress-bar-animated')).toMatchSnapshot();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
