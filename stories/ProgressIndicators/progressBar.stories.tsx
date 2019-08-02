import { storiesOf } from '@storybook/react';
import React from 'react';
import ProgressBar from '../../packages/ProgressIndicators/src/ProgressBar';
import notes from '../../packages/ProgressIndicators/src/ProgressBar/README.md';
import './utilStyles.css';

const GREEN = '#00FF00';
const RED = '#FF0000';
const YELLOW = '#FFFF00';

const valueProps = {
  value: 59
};

const lineColorThresholds = {
  [GREEN]: 70,
  [RED]: 0,
  [YELLOW]: 30
};

storiesOf('ProgressBar', module)
  .add('with default settings', () => (
    <div>
      <p>
        Does not show anything since the value is set to 0 by default, we added a green border so
        that you can see the bounds of the progressbar
      </p>
      <div className="zero-value">
        <ProgressBar />
      </div>
    </div>
  ))
  .add('with sample value and blue lineColor', () => <ProgressBar {...valueProps} />, { notes })
  .add('with lineColor Thresholds and different values', () => (
    <div>
      <p> With a value of 20</p>
      <ProgressBar {...{ lineColorThresholds, value: 20 }} />
      <p> With a value of 40</p>
      <ProgressBar {...{ lineColorThresholds, value: 40 }} />
      <p>Whith a value of 80</p>
      <ProgressBar {...{ lineColorThresholds, value: 80 }} />
    </div>
  ));
