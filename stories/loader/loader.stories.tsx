import { storiesOf } from '@storybook/react';
import React from 'react';
import notes from '../../packages/loader/README.md';
import Loader from '../../packages/loader/src';

const colorStyle = {
  borderColor: '#FF22EF'
};

const sizestyle = {
  borderStyle: 'dotted'
};

storiesOf('Loader', module)
  .add('with default settings', () => <Loader />, { notes })
  .add('with different color', () => <Loader {...colorStyle} />, { notes })
  .add('with different border', () => <Loader {...sizestyle} />, { notes });
