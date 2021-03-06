import { storiesOf } from '@storybook/react';
import React from 'react';
import notes from '../../packages/ProgressIndicators/README.md';
import ProgressBar from '../../packages/ProgressIndicators/src/ProgressBar';

import 'bootstrap/dist/css/bootstrap.min.css';

const valueProps = {
  value: 59
};

const stripped = true;

const animate = true;

const lineColorThresholds = {
  GREEN_THRESHOLD: {
    color: '#2ECC40',
    name: 'Green',
    value: 1
  },
  GREY_THRESHOLD: {
    color: '#dddddd',
    name: 'Grey',
    value: 0.2
  },
  RED_THRESHOLD: {
    color: '#FF4136',
    name: 'Red',
    orEquals: true,
    value: 0.75
  },
  YELLOW_THRESHOLD: {
    color: '#FFDC00',
    name: 'Yellow',
    value: 0.9
  }
};

const showLabelProps = {
  showLabel: true,
  value: 60
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
  ))
  .add('with value labels', () => (
    <div>
      <p> Show width values as labels </p>
      <ProgressBar {...showLabelProps} />
    </div>
  ))
  .add('with strips', () => (
    <div>
      <p> Contains strips </p>
      <ProgressBar {...{ value: 35, stripped }} />
      <p> Contains strips with lineColorThresholds </p>
      <ProgressBar {...{ lineColorThresholds, value: 20, stripped }} />
    </div>
  ))
  .add('with animated stripped bars', () => (
    <div>
      <p>Show animated strips if animate value is true otherwise show a stripped progress bar</p>
      <ProgressBar {...{ value: 60, animate }} />
    </div>
  ));
