import { mount } from 'enzyme';
import React from 'react';
import { DropDownCell, NullDataComponent } from '../index';

describe('src/components/Table/DrillDownTable/components/HelperComponents', () => {
  it('renders correctly when with children', () => {
    const props = {
      cellValue: <div>Cell value</div>,
      hasChildren: true
    };
    const wrapper = mount(<DropDownCell {...props} />);
    expect(wrapper.text()).toMatchInlineSnapshot(`"Cell value ▼"`);
  });

  it('renders correctly when without children', () => {
    const props = {
      cellValue: <div>Cell value</div>,
      hasChildren: false
    };
    const wrapper = mount(<DropDownCell {...props} />);
    expect(wrapper.text()).toMatchInlineSnapshot(`"Cell value"`);
  });

  /** tests for null data components */
  it('renders nullData components correctly', () => {
    const wrapper = mount(<NullDataComponent />);
    expect(wrapper.text()).toMatchInlineSnapshot(`"No Data Found"`);
  });
});
