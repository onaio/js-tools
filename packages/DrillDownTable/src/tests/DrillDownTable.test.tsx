import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { RowInfo } from 'react-table';
import DrillDownTable, { DropDownCellProps } from '..';
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

  it('renders correctly even with invalid linkerField', () => {
    const props = {
      data,
      linkerField: 'fakeColumn'
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly with derived columns', () => {
    const props = {
      data
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('click to drill down works', () => {
    const props = {
      data
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper.find('div.ReactTable'))).toMatchSnapshot();
    // drill down first level
    expect(wrapper.find('.dd-linker-item.dd-clickable').length).toEqual(3);
    wrapper
      .find('.dd-linker-item.dd-clickable')
      .first()
      .simulate('click');
    expect(toJson(wrapper.find('div.ReactTable'))).toMatchSnapshot();
    // drill down second level
    expect(wrapper.find('.dd-linker-item.dd-clickable').length).toEqual(2);
    wrapper
      .find('.dd-linker-item.dd-clickable')
      .first()
      .simulate('click');
    expect(toJson(wrapper.find('div.ReactTable'))).toMatchSnapshot();
    // there should now be no more drilling down possible
    expect(wrapper.find('.dd-linker-item.dd-clickable').length).toEqual(0);
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

  it('gets linkerColumn from nested columns', () => {
    const columns = [
      {
        Header: 'Top Header',
        columns: [
          {
            Header: 'Name',
            accessor: 'location'
          }
        ]
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
    expect(wrapper.find('.dd-linker-item.dd-clickable').length).toEqual(3);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('works fine with custom getTrProps', () => {
    const props = {
      data,
      getTrProps: (row: RowInfo) => {
        return {
          onClick: () => void 0,
          row
        };
      }
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('works fine with useDrillDownTrProps being flase', () => {
    const props = {
      data,
      useDrillDownTrProps: false
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('works fine with extraCellProps', () => {
    /** Interface for cell props */
    interface NewCellProps extends DropDownCellProps {
      urlPath: string;
      caret: string;
    }

    /** Custom cell component for testing.
     */
    const NewCell: React.ElementType = (props: NewCellProps) => {
      const { cellValue, hasChildren, urlPath, caret } = props;
      return (
        <div>
          <span>
            {hasChildren ? (
              <a href={urlPath}>
                {cellValue} {caret}
              </a>
            ) : (
              cellValue
            )}
          </span>
        </div>
      );
    };

    const cellProps = {
      CellComponent: NewCell,
      data,
      extraCellProps: { urlPath: 'http://example.com', caret: <span>&#43;</span> }
    };
    const wrapper = mount(<DrillDownTable {...cellProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
