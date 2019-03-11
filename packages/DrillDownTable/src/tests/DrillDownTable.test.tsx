import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import DrillDownTable from '..';
import { data, dataLowestLevel } from './fixtures';

describe('DrillDownTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      data,
      linkerField: 'location'
    };
    shallow(<DrillDownTable {...props} />);
  });

  it('renders correctly with derived columns', () => {
    const props = {
      data
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly lowest level hierarchy', () => {
    const props = {
      data: dataLowestLevel
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with custom columns', () => {
    const columns = [
      {
        Header: 'Name',
        accessor: 'location'
      },
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Parent ID',
        accessor: 'parent_id'
      },
      {
        Header: 'Spray Coverage',
        accessor: 'spray_coverage'
      }
    ];
    const props = {
      columns,
      data
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with custom columns and custom linker column', () => {
    const columns = [
      {
        Header: 'Name',
        accessor: 'location'
      },
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Parent ID',
        accessor: 'parent_id'
      },
      {
        Header: 'Spray Coverage',
        accessor: 'spray_coverage'
      }
    ];
    const props = {
      columns,
      data,
      linkerField: 'location'
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
