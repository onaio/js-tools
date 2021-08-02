import { mount, shallow } from 'enzyme';
import React from 'react';
import { Legend } from '../../legend';
import { legendBlockBuilder } from '../../legend/utils/helpers';

describe('Legend Component', () => {
  it('renders without crashing', () => {
    shallow(<Legend />);
  });
  it('renders props correctly', () => {
    const wrapper = mount(<Legend />);
    expect(wrapper).toMatchSnapshot('legend props');
  });

  it('returns legend markup', () => {
    const wrapper = mount(<Legend />);
    expect(wrapper.html()).toMatchSnapshot('legend markup');
  });
  it('returns legend text correctly', () => {
    const wrapper = mount(<Legend />);
    expect(wrapper.text()).toMatchInlineSnapshot(`"01-23-66-1112-16Age break down"`);
  });
  it('builds legendblocks correctly', () => {
    expect(legendBlockBuilder('#000', '20', 'a-b')).toMatchInlineSnapshot(`
      <li
        style={
          Object {
            "background": "#000",
            "width": "20%",
          }
        }
      >
        a-b
      </li>
    `);
  });
});
