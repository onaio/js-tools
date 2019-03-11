// stories of DrillDownTable
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
/* eslint-enable import/no-extraneous-dependencies */
import 'react-table/react-table.css';
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

function renderDerivedTable() {
  const props = {
    data,
    linkerField: 'location'
  };
  return <DrillDownTable {...props} />;
}

storiesOf('DrillDownTable', module)
  .add('simple', renderTable)
  .add('get columns from data', renderDerivedTable);
