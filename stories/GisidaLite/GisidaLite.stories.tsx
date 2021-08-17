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
} from '../../packages/GisidaLite/src/map';

import { Legend } from '../../packages/GisidaLite/src/legend';

function renderGisidaLite() {
  return <GisidaLite {...gisidaLiteDefaultProps} />;
}
function renderMemoizedGisidaLite() {
  return <MemoizedGisidaLite {...gisidaLiteDefaultProps} />;
}
function renderLegend() {
  return <Legend />;
}

storiesOf('GisidaLite', module)
  .add('GisidaLite', renderGisidaLite, { notes })
  .add('Legend', renderLegend, { notes })
  .add('MemoizedGisidaLite', renderMemoizedGisidaLite, { notes });
