import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { DropDownCell, NullDataComponent, Spinner } from '../index';

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

  /** tets for ripple */
  it('renders default Spinner without crashing', () => {
    const wrapper = shallow(<Spinner />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
