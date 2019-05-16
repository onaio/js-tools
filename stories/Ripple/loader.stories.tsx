import { storiesOf } from '@storybook/react';
import React from 'react';
import notes from '../../packages/Ripple/README.md';
import Loader from '../../packages/Ripple/src';

const colorStyle = {
  borderColor: '#FF22EF'
};

const sizestyle = {
  borderStyle: 'dotted'
};

storiesOf('Ripple', module)
  .add('with default settings', () => <Loader />, { notes })
  .add('with different color', () => <Loader {...colorStyle} />, { notes })
  .add('with different border', () => <Loader {...sizestyle} />, { notes });
