import { Dictionary } from '@onaio/utils/dist/types/types';
import { mount, ReactWrapper, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Column } from 'react-table';
import { columnsFromObject } from '../../helpers/utils';
import { DrillDownTablev7 } from '../DrillDownTable';
import { DropDownCellProps } from '../HelperComponents';
import { data, dataLowestLevel } from './fixtures';

const dataColumns = columnsFromObject(data);
const emptyColumns = columnsFromObject([]);

const renderTable = (wrap: ReactWrapper, text = '') => {
  wrap
    .find('table tr')
    .forEach((tr, indx) => expect(tr.text()).toMatchSnapshot(`${text} tr index ${indx}`));
};

describe('DrillDownTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      columns: emptyColumns,
      data: [],
      linkerField: 'location'
    };
    shallow(<DrillDownTablev7 {...props} />);
  });

  it('renders correctly even with invalid linkerField', () => {
    const props = {
      columns: dataColumns,
      data,
      linkerField: 'fakeColumn',
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTablev7 {...props} />);

    expect(wrapper.find('Table').props().data).toEqual(data.filter(e => e.parent_id === null));
    wrapper.unmount();
  });

  it('renders correctly with derived columns', () => {
    const props = {
      columns: dataColumns,
      data,
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTablev7 {...props} />);
    expect((wrapper.find('Table').props() as any).columns).toMatchSnapshot([
      { Cell: expect.any(Function), Header: 'id', accessor: 'id' },
      { Header: 'location', accessor: 'location' },
      {
        Header: 'parent_id',
        accessor: 'parent_id'
      },
      { Header: 'spray_coverage', accessor: 'spray_coverage' },
      { Header: 'spray_effectiveness', accessor: 'spray_effectiveness' }
    ]);
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
    const props: any = {
      columns,
      data
    };
    // this does not have a useDrilDown it will render all the rows, subject to pagination
    const wrapper = mount(<DrillDownTablev7 {...props} />);
    expect((wrapper.find('Table').props() as any).columns).toMatchSnapshot(columns);
    wrapper.unmount();
  });

  it('click to drill down works', () => {
    const props = {
      columns: dataColumns,
      data,
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTablev7 {...props} />);
    // wrapper.update();
    // render the whole table

    renderTable(wrapper, 'InitialRender');

    // drill down first level
    expect(toJson(wrapper.find('.dd-linker-item.dd-clickable'))).toMatchSnapshot();
    expect(wrapper.find('.dd-linker-item.dd-clickable').length).toEqual(3);
    wrapper
      .find('.dd-linker-item.dd-clickable')
      .first()
      .simulate('click');
    wrapper.update();
    renderTable(wrapper, 'After first drillDown');
    // drill down second level
    expect(wrapper.find('.dd-linker-item.dd-clickable').length).toEqual(2);
    wrapper
      .find('.dd-linker-item.dd-clickable')
      .first()
      .simulate('click');
    wrapper.update();
    // render the whole table
    renderTable(wrapper, 'After second Drilldown');
    // there should now be no more drilling down possible
    expect(wrapper.find('.dd-linker-item.dd-clickable').length).toEqual(0);
    wrapper.unmount();
  });

  it('renders correctly lowest level hierarchy', () => {
    const props = {
      columns: dataColumns,
      data: dataLowestLevel,
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTablev7 {...props} />);
    expect(wrapper.text()).toMatchSnapshot('full rendered data');
    wrapper.unmount();
  });

  it('renders correctly with custom columns and custom linker column', () => {
    const columns: Array<Column<Dictionary>> = [
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
      linkerField: 'location',
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTablev7 {...props} />);
    renderTable(wrapper, 'Full render');
    wrapper.unmount();
  });

  it('works fine with useDrillDown being flase', () => {
    const props = {
      columns: dataColumns,
      data,
      useDrillDown: false
    };
    const wrapper = mount(<DrillDownTablev7 {...props} />);
    expect(wrapper.text()).toMatchSnapshot('Full render');
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
      columns: dataColumns,
      data,
      extraCellProps: { urlPath: 'http://example.com', caret: <span>&#43;</span> }
    };
    const wrapper = mount(<DrillDownTablev7 {...cellProps} />);
    expect(wrapper.text()).toMatchSnapshot('find the carret');
    wrapper.unmount();
  });
});
