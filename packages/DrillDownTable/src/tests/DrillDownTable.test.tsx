import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ReactTable from 'react-table';
import DrillDownTable, { WithHeaders } from '../DrillDownTable';
import { data } from './fixtures';

describe('DrillDownTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(<DrillDownTable />);
  });
});

describe('DrillDownTable/WithHeaders', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const SomeTable = WithHeaders(ReactTable);
    shallow(<SomeTable data={data} />);
  });

  it('renders correctly with custom columns', () => {
    const SomeTable = WithHeaders(ReactTable);
    const wrapper = mount(<SomeTable data={data} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with derived columns', () => {
    const SomeTable = WithHeaders(ReactTable);
    const wrapper = mount(<SomeTable data={data} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
