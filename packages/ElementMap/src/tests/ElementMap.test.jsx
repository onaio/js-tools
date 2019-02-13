// Test Element Map
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ElementMap from '../ElementMap';

describe('ElementMap', () => {
  it('renders without crashing', () => {
    const headerItems = ['Name', 'Age'];
    shallow(<ElementMap items={headerItems} HTMLTag="th" />);
  });

  it('renders tags correctly', () => {
    const headerItems = ['Name', 'Age'];
    const headerItems2 = ['Subject', 'Difficulty'];
    const wrapper = mount(<ElementMap items={headerItems} HTMLTag="div" />);
    const wrapper2 = mount(<ElementMap items={headerItems2} HTMLTag="span" className="fancy" />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(wrapper2)).toMatchSnapshot();
    wrapper.unmount();
  });
});
