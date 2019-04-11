import ElementMap from '@onaio/element-map';
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
      theadClass: 'thead-dark'
    };
    shallow(<ListView {...props} />);
  });

  it('renders correctly', () => {
    const props = {
      data: [['Ed', 6, 'Taller'], ['Edd', 12, 'Tallest'], ['Eddie', 17, 'Tall']],
      headerItems: ['Name', 'Age', 'Height'],
      tableClass: 'table-striped',
      tbodyClass: 'table-active',
      theadClass: 'thead-dark'
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
      theadClass: 'thead-dark'
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
      theadClass: 'thead-dark'
    };
    const wrapper = mount(<ListView {...tableProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly without thead, tableClass, tbodyClass', () => {
    const props: ListViewProps = {
      data: [['Data 1'], [999], ['Data 3']]
    };
    const wrapper = mount(<ListView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with custom renderHeaders prop', () => {
    const props = {
      data: [['Ed', 6], ['Edd', 12], ['Eddie', 17]],
      headerItems: ['Name', 'Age'],
      renderHeaders: (items, cssClass) => (
        <thead className={cssClass}>
          <tr>
            <th colSpan={2}>Top Header</th>
          </tr>
          <tr>
            <ElementMap items={items} HTMLTag="th" />
          </tr>
        </thead>
      )
    };
    const wrapper = mount(<ListView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with no renderHeaders prop', () => {
    const props = {
      data: [['Ed'], ['Edd'], ['Eddie']],
      headerItems: ['Name'],
      renderHeaders: undefined
    };
    const wrapper = mount(<ListView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with custom renderRows prop', () => {
    const props = {
      data: [['Ed', 6], ['Edd', 12], ['Eddie', 17]],
      headerItems: ['Name', 'Age'],
      renderRows: (rowData, cssClass) => {
        const rows = rowData.map((items, itemKey) => (
          <tr key={itemKey}>
            <ElementMap items={items} HTMLTag="td" />
          </tr>
        ));
        return <tbody className={cssClass}>{rows}</tbody>;
      }
    };
    const wrapper = mount(<ListView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
