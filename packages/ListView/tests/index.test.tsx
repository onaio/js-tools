import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ListView, { ListViewProps } from '../';

describe('ListView', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      data: [['Data 1'], ['Data 2'], ['Data 3']],
      headerItems: ['Columns'],
      tableClass: 'table-striped',
      tbodyClass: 'table-active',
      theaderClass: 'thead-dark'
    };
    shallow(<ListView {...props} />);
  });

  it('renders correctly', () => {
    const props = {
      data: [['Data 1'], ['Data 2'], ['Data 3']],
      headerItems: ['Columns'],
      tableClass: 'table-striped',
      tbodyClass: 'table-active',
      theaderClass: 'thead-dark'
    };
    const wrapper = mount(<ListView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with different types of data', () => {
    const props: ListViewProps = {
      data: [['Data 1'], [999], ['Data 3']],
      headerItems: ['Columns'],
      tableClass: 'table-striped',
      tbodyClass: 'table-active',
      theaderClass: 'thead-dark'
    };
    const wrapper = mount(<ListView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with rows containing components', () => {
    const SomeComponent: React.ElementType = props => {
      return (
        <div>
          <span>{props.value}</span>
        </div>
      );
    };
    const tableProps: ListViewProps = {
      data: [
        ['Data 1'],
        [<div key="123">Data 2</div>],
        [<SomeComponent key="456" value="Data 3" />]
      ],
      headerItems: ['Columns'],
      tableClass: 'table-striped',
      tbodyClass: 'table-active',
      theaderClass: 'thead-dark'
    };
    const wrapper = mount(<ListView {...tableProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
  it('renders correctly without th, tbclass, tbodyclass and theaderclass', () => {
    const props: ListViewProps = {
      data: [['Data 1'], [999], ['Data 3']]
    };
    const wrapper = mount(<ListView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
