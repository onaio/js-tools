// Test Element Map
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ElementMap from '../';

describe('ElementMap', () => {
  it('renders without crashing', () => {
    const headerItems = ['Name', 'Age'];
    shallow(<ElementMap items={headerItems} HTMLTag="th" />);
  });

  it('renders tags correctly', () => {
    const headerItems = ['Name', 'Age'];
    const headerItems2 = ['Fruit', 'Price'];
    const wrapper = mount(<ElementMap items={headerItems} HTMLTag="div" />);
    const wrapper2 = mount(<ElementMap items={headerItems2} HTMLTag="span" className="fancy" />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(wrapper2)).toMatchSnapshot();
    wrapper.unmount();
    wrapper2.unmount();
  });

  it('works with with HTML elements', () => {
    const items = [
      <span key="1">Ed</span>,
      <span key="11">Edd</span>,
      <span key="111">Eddie</span>
    ];
    const wrapper = mount(<ElementMap items={items} HTMLTag="div" className="xkcd" />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('works with with itself', () => {
    const items = [
      <ElementMap key="a" items={['a', 'b', 'c']} HTMLTag="span" />,
      <ElementMap key="b" items={['bob', 'alice']} HTMLTag="span" />,
      <ElementMap key="c" items={[99, 199, 299]} HTMLTag="span" />
    ];
    const wrapper = mount(<ElementMap items={items} HTMLTag="div" className="xkcd" />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
