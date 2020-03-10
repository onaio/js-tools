// stories of ListView
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
import notes from '../../packages/ListView/README.md';
/* eslint-enable import/no-extraneous-dependencies */
import ListView from '../../packages/ListView/src';

function renderListView() {
  const props = {
    data: [
      ['Ed', 6, 'Taller'],
      ['Edd', 12, 'Tallest'],
      ['Eddie', 17, 'Tall']
    ],
    headerItems: ['Name', 'Age', 'Height'],
    tableClass: 'table-striped',
    tbodyClass: 'table-active',
    tdClass: 'table-primary',
    thClass: 'table-info',
    theadClass: 'thead-dark',
    trClass: 'table-success'
  };
  return <ListView {...props} />;
}

storiesOf('ListView', module).add('simple list', renderListView, { notes });
