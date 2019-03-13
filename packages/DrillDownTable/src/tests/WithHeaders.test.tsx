import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import WithHeaders from '../WithHeaders';
import { data } from './fixtures';

describe('DrillDownTable/WithHeaders', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(<WithHeaders data={data} />);
  });

  it('renders correctly with custom columns', () => {
    const columns = [
      {
        Header: 'Name',
        accessor: 'location'
      },
      {
        Header: 'Spray Coverage',
        accessor: 'spray_coverage'
      }
    ];
    const wrapper = mount(<WithHeaders data={data} columns={columns} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with derived columns', () => {
    const wrapper = mount(<WithHeaders data={data} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
