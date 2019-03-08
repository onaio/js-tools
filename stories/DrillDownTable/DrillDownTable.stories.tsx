// stories of DrillDownTable
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
/* eslint-enable import/no-extraneous-dependencies */
import 'react-table/react-table.css';
import DrillDownTable from '../../packages/DrillDownTable/src';
import { data } from '../../packages/DrillDownTable/src/tests/fixtures';

function renderTable() {
  const props = { data };
  return <DrillDownTable {...props} />;
}

storiesOf('DrillDownTable', module).add('simple', renderTable);
