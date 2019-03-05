// stories of ElementMap
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
/* eslint-enable import/no-extraneous-dependencies */
import ElementMap from '../../packages/ElementMap/src/ElementMap';
import notes from '../../packages/ElementMap/README.md';

function renderList() {
  const fruits = ['Apple', 'Banana', 'Grape', 'Orange', 'Plum'];
  return (
    <ul>
      <ElementMap items={fruits} HTMLTag="li" />
    </ul>
  );
}

function renderTable() {
  const fruits = ['Apple', 'Banana', 'Grape', 'Orange', 'Plum'];
  return (
    <table>
      <ElementMap items={fruits} HTMLTag="tr" />
    </table>
  );
}

storiesOf('ElementMap', module)
  .add('list items', renderList, { notes })
  .add('table rows', renderTable, { notes });
