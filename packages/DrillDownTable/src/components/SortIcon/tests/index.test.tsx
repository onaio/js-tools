import { shallow } from 'enzyme';
import React from 'react';
import { SortIcon, SortIconProps } from '..';

describe('src/components/Table/DrillDown/SortIcon', () => {
  it('renders without crashing', () => {
    // fortunately unfortunately this component is pure csss, there is not
    // much testing we can do here.
    const propsBranch1: SortIconProps = {
      isSorted: true,
      isSortedDesc: false
    };
    const propsBranch2: SortIconProps = {
      isSorted: true,
      isSortedDesc: true
    };
    const propsBranch3: SortIconProps = {
      isSorted: false,
      isSortedDesc: true
    };
    const wrapper = shallow(<SortIcon {...propsBranch1} />);
    expect(wrapper.text()).toMatchInlineSnapshot(`""`);

    shallow(<SortIcon {...propsBranch3} />);
    shallow(<SortIcon {...propsBranch2} />);
  });
});
