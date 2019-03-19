// stories of ElementMap
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
import notes from '../../packages/ElementMap/README.md';
/* eslint-enable import/no-extraneous-dependencies */
import ElementMap from '../../packages/ElementMap/src/';

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
      <tbody>
        <tr>
          <ElementMap items={fruits} HTMLTag="td" />
        </tr>
      </tbody>
    </table>
  );
}

storiesOf('ElementMap', module)
  .add('list items', renderList, { notes })
  .add('table rows', renderTable, { notes });
