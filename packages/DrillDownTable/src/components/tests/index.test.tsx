import { Dictionary } from '@onaio/utils/dist/types/types';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Column } from 'react-table';
import { columnsFromObjects } from '../../helpers/utils';
import { renderTable } from '../../test-utils';
import { DrillDownTable } from '../DrillDownTable';
import { DropDownCellProps } from '../HelperComponents';
import { renderPaginationFun } from '../Pagination';
import { RenderFiltersInBarOptions } from '../TableJSX';
import { data, dataLowestLevel, jurisdictions } from './fixtures';

const dataColumns = columnsFromObjects(data);
const jurisdictionColumns = columnsFromObjects(jurisdictions);
const emptyColumns = columnsFromObjects([]);

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
    shallow(<DrillDownTable {...props} />);
  });

  it('renders correctly even with invalid linkerField', () => {
    const props = {
      columns: dataColumns,
      data,
      linkerField: 'fakeColumn',
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTable {...props} />);

    expect(wrapper.find('Table').props().data).toEqual(data.filter(e => e.parent_id === null));
    wrapper.unmount();
  });

  it('renders correctly with derived columns', () => {
    const props = {
      columns: dataColumns,
      data,
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTable {...props} />);
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
    const wrapper = mount(<DrillDownTable {...props} />);
    expect((wrapper.find('Table').props() as any).columns).toMatchSnapshot(columns);
    wrapper.unmount();
  });

  it('click to drill down works', () => {
    const props = {
      columns: dataColumns,
      data,
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTable {...props} />);
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
    const wrapper = mount(<DrillDownTable {...props} />);
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
    const wrapper = mount(<DrillDownTable {...props} />);
    renderTable(wrapper, 'Full render');
    wrapper.unmount();
  });

  it('works fine with useDrillDown being flase', () => {
    const props = {
      columns: dataColumns,
      data,
      useDrillDown: false
    };
    const wrapper = mount(<DrillDownTable {...props} />);
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
    const wrapper = mount(<DrillDownTable {...cellProps} />);
    expect(wrapper.text()).toMatchSnapshot('find the carret');
    wrapper.unmount();
  });
  it('renders correctly without data', () => {
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
      data: []
    };
    // should render the default null data component
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(wrapper.text()).toMatchInlineSnapshot(`"NameIDParent IDSpray CoverageNo Data Found"`);
    wrapper.unmount();
  });
  it('renders custom null data component correctly', () => {
    const textNode =
      'You start forgetting the things you should remember and remembering the things you should forget.';
    const CustomNullData = () => <div id="#ghost">{textNode}</div>;
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
      data: [],
      nullDataComponent: CustomNullData
    };
    // should render the default null data component
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(wrapper.text()).toMatchInlineSnapshot(
      `"NameIDParent IDSpray CoverageYou start forgetting the things you should remember and remembering the things you should forget."`
    );
    wrapper.unmount();
  });
  it('respects loading prop', () => {
    const props = {
      columns: dataColumns,
      data,
      loading: true,
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(wrapper.find('Spinner').length).toEqual(1);
    wrapper.unmount();
  });

  it('renders custom loading correctly', () => {
    const textNode = 'It is fatal to enter any war without the will to win it.';
    const CustomLoading = () => <div id="#MacArthur">{textNode}</div>;
    const props = {
      columns: dataColumns,
      data,
      loading: true,
      loadingComponent: CustomLoading,
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    expect(wrapper.text()).toMatchInlineSnapshot(
      `"It is fatal to enter any war without the will to win it."`
    );
    wrapper.unmount();
  });
  // pagination stuff.
  it('pagination works correctly', () => {
    /** default renderInFilter Function; includes the pagination, customize columns, and row height */
    const customRenderInFilterBar = <T extends object>(
      tableProps: RenderFiltersInBarOptions<T>
    ) => {
      return (
        <div className="row">
          <div className="col">{renderPaginationFun(tableProps)}</div>
        </div>
      );
    };
    const props = {
      columns: jurisdictionColumns,
      data: jurisdictions,
      linkerField: 'name',
      renderInTopFilterBar: customRenderInFilterBar,
      rootParentId: '',
      useDrillDown: true
    };
    const wrapper = mount(<DrillDownTable {...props} />);
    /** pagination components are rendered */
    expect(wrapper.find('RevealPagination').text()).toMatchInlineSnapshot(
      `"Rows to display10203050PreviousPage    Of 2Next "`
    );

    wrapper.update();
    /** contents rendered on page 1; should be about 10 */
    renderTable(wrapper, 'page 1 ');

    // got to next page.
    const buttonsNum = wrapper.find('button').length;
    wrapper
      .find('button')
      .at(buttonsNum - 1)
      .simulate('click');
    wrapper.update();
    renderTable(wrapper, 'page 2 ');
    wrapper.unmount();
  });
});
