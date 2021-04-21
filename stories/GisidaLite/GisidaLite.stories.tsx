// stories of GisidaLite
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
import notes from '../../packages/GisidaLite/README.md';
/* eslint-enable import/no-extraneous-dependencies */
import {
  GisidaLite,
  gisidaLiteDefaultProps,
  MemoizedGisidaLite
} from '../../packages/GisidaLite/src';

function renderGisidaLite() {
  return <GisidaLite {...gisidaLiteDefaultProps} />;
}
function renderMemoizedGisidaLite() {
  return <MemoizedGisidaLite {...gisidaLiteDefaultProps} />;
}

storiesOf('GisidaLite', module)
  .add('GisidaLite', renderGisidaLite, { notes })
  .add('MemoizedGisidaLite', renderMemoizedGisidaLite, { notes });
