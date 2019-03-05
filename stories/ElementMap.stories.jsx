// stories of ElementMap
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
/* eslint-enable import/no-extraneous-dependencies */
import ElementMap from '../packages/ElementMap/src/ElementMap';

function renderList() {
  const fruits = ['Apple', 'Banana', 'Grape', 'Orange', 'Plum'];
  return (
    <ul>
      <ElementMap items={fruits} HTMLTag="li" />
    </ul>
  );
}

storiesOf('ElementMap', module).add('list items', renderList);
