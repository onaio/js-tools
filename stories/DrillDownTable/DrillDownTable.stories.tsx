// stories of DrillDownTable
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
/* eslint-enable import/no-extraneous-dependencies */
import 'react-table/react-table.css';
import notes from '../../packages/DrillDownTable/README.md';
import DrillDownTable from '../../packages/DrillDownTable/src';
import { data } from '../../packages/DrillDownTable/src/tests/fixtures';

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
  const props = {
    columns,
    data,
    linkerField: 'location'
  };
  return <DrillDownTable {...props} />;
}

function renderNestedColumnTable() {
  const columns = [
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
  const props = {
    columns,
    data,
    linkerField: 'location'
  };
  return <DrillDownTable {...props} />;
}

function renderDerivedTable() {
  const props = {
    data,
    linkerField: 'location'
  };
  return <DrillDownTable {...props} />;
}

function renderNoTrPropsTable() {
  const props = {
    data,
    linkerField: 'location',
    useDrillDownTrProps: false
  };
  return <DrillDownTable {...props} />;
}

storiesOf('DrillDownTable', module)
  .add('simple', renderTable, { notes })
  .add('get columns from data', renderDerivedTable, { notes })
  .add('with nested columns', renderNestedColumnTable, { notes })
  .add('with no getTrProps', renderNoTrPropsTable, { notes });
