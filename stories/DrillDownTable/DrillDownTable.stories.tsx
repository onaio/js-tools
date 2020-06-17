// stories of DrillDownTablev7
/* eslint-disable import/no-extraneous-dependencies */
import { Dictionary } from '@onaio/utils/src';
import { storiesOf } from '@storybook/react';
import React from 'react';
/* eslint-enable import/no-extraneous-dependencies */
import notes from '../../packages/DrillDownTable/README.md';
import {
  columnsFromObjects,
  DrillDownColumn,
  DrillDownTable,
  DrillDownTableProps,
  DropDownCellProps,
  RenderFiltersInBarOptions,
  renderPaginationFun
} from '../../packages/DrillDownTable/src';
import { data } from '../../packages/DrillDownTable/src/components/tests/fixtures';
import '../../packages/DrillDownTable/src/table.css';
import { jurisdictions } from './fixtures';
import './story.css';

function renderTable() {
  const columns = [
    {
      Header: 'Name',
      accessor: 'location'
    },
    {
      Header: 'Spray Coverage',
      accessor: 'spray_coverage'
    },
    {
      Header: 'Spray Effectiveness',
      accessor: 'spray_effectiveness'
    }
  ];
  const props: Pick<DrillDownTableProps<Dictionary>, 'columns' | 'data' | 'linkerField'> = {
    columns,
    data,
    linkerField: 'location'
  };
  return <DrillDownTable {...props} />;
}

function renderNestedColumnTable() {
  const columns: Array<DrillDownColumn<Dictionary>> = [
    {
      Header: 'Header Group',
      columns: [
        {
          Header: 'ID',
          accessor: 'id'
        },
        {
          Header: 'Name',
          accessor: 'location'
        }
      ]
    },
    {
      Header: 'Spray Coverage',
      accessor: 'spray_coverage'
    }
  ];
  const props: Pick<DrillDownTableProps<Dictionary>, 'columns' | 'data' | 'linkerField'> = {
    columns,
    data,
    linkerField: 'location'
  };
  return <DrillDownTable {...props} />;
}

function renderDerivedTable() {
  const props = {
    columns: columnsFromObjects(data),
    data,
    linkerField: 'location'
  };
  return <DrillDownTable {...props} />;
}

function renderNoTrPropsTable() {
  const props = {
    columns: columnsFromObjects(data),
    data,
    linkerField: 'location',
    useDrillDown: false
  };
  return <DrillDownTable {...props} />;
}

function renderCustomCellTable() {
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
    columns: columnsFromObjects(data),
    data,
    extraCellProps: { urlPath: 'http://example.com', caret: <span>&#43;</span> },
    linkerField: 'location',
    useDrillDownTrProps: false
  };
  return <DrillDownTable {...cellProps} />;
}

function largeDataSet() {
  const columns: Array<DrillDownColumn<Dictionary>> = [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'id',
      accessor: 'id'
    },
    {
      Header: 'parent',
      accessor: 'parent_id'
    },
    {
      Header: 'Level',
      accessor: 'geographic_level'
    }
  ];
  const props = {
    columns,
    data: jurisdictions,
    linkerField: 'name',
    rootParentId: ''
  };
  return <DrillDownTable {...props} />;
}

function withPagination() {
  const [showBottom, setShowBottom] = React.useState<boolean>(false);
  const hide = () => setShowBottom(false);
  const show = () => setShowBottom(true);

  const customRenderInFilterBar = <T extends object>(tableProps: RenderFiltersInBarOptions<T>) => {
    return (
      <div className="row">
        <div className="col">{renderPaginationFun(tableProps)}</div>
      </div>
    );
  };
  let props: Pick<
    DrillDownTableProps<Dictionary>,
    | 'columns'
    | 'data'
    | 'linkerField'
    | 'renderInTopFilterBar'
    | 'renderInBottomFilterBar'
    | 'rootParentId'
    | 'useDrillDown'
  > = {
    columns: columnsFromObjects<Dictionary>(jurisdictions),
    data: jurisdictions,
    linkerField: 'name',
    renderInTopFilterBar: customRenderInFilterBar,
    rootParentId: '',
    useDrillDown: true
  };
  if (showBottom) {
    props = { ...props, renderInBottomFilterBar: customRenderInFilterBar };
  }
  return (
    <div>
      <div>
        {!showBottom ? (
          // tslint:disable-next-line: jsx-no-lambda
          <button onClick={() => show()}>Show bottom pagination</button>
        ) : (
          // tslint:disable-next-line: jsx-no-lambda
          <button onClick={() => hide()}>hide bottom pagination</button>
        )}
      </div>

      <DrillDownTable {...props} />
    </div>
  );
}

storiesOf('DrillDownTable', module)
  .add('simple', renderTable, { notes })
  .add('get columns from data', renderDerivedTable, { notes })
  .add('with nested columns', renderNestedColumnTable, { notes })
  .add('with useDrillDown set to false', renderNoTrPropsTable, { notes })
  .add('custom cell component', renderCustomCellTable, { notes })
  .add('large dataset', largeDataSet, { notes })
  .add('with pagination', withPagination, { notes });
