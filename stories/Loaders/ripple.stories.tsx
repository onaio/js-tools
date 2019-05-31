import { storiesOf } from '@storybook/react';
import React from 'react';
import notes from '../../packages/Loaders/README.md';
import { Ripple } from '../../packages/Loaders/src';

const colorStyle = {
  borderColor: '#FF22EF'
};

const sizestyle = {
  borderStyle: 'dotted'
};

storiesOf('Ripple Loader', module)
  .add('with default settings', () => <Ripple />, { notes })
  .add('with different color', () => <Ripple {...colorStyle} />, { notes })
  .add('with different border', () => <Ripple {...sizestyle} />, { notes });
