// import { number } from 'prop-types';
import React from 'react';
// import * as colors from '../colors';
// import { GREEN_THRESHOLD, ORANGE_THRESHOLD, YELLOW_THRESHOLD } from '../configs/settings';

/**
 * - Is it possible to prop the styles too
 * - how exactly would that work:
 *    prop in the background color => what if we had a background prop that took the background color
 *    what if props would included a background color and the threshhold.
 */

/** Props for ProgressBar */
interface ProgressBarProps {
  decimalPoints: number;
  height: string;
  min: number;
  max: number;
  value: number;
  lineColor: string;
  lineColorThresholds?: { [key: string]: number } | undefined;
}

/** default props for ProgressBar */
const defaultProgressBarProps: Partial<ProgressBarProps> = {
  decimalPoints: 0,
  height: '10px',
  lineColor: '#5269EB',
  lineColorThresholds: undefined,
  max: 100,
  min: 0
};

/** Displays configurable progress bar */
const ProgressBar = (props: ProgressBarProps) => {
  const { decimalPoints, height, value, lineColor, lineColorThresholds } = props;
  let backgroundColor = lineColor;
  const max = props.max || 100;
  const min = props.min || 0;
  let range = max - min;
  if (range <= 0) {
    range = 100;
  }
  const decimalValue = value / range;
  const percentValue = decimalValue * 100;
  const percentValueString = percentValue.toFixed(decimalPoints);

  // set the line color: if lineColorThresholds is not given then use lineColor
  if (!lineColorThresholds) {
    // sort the color and their thresholds by the threshhold value
    const DescendingThresholds = Object.entries(!lineColorThresholds).sort(
      (e1, e2) => e2[1] - e1[1]
    );
    // top to bottom check to see which color threshold is matched first by the percentvalue
    DescendingThresholds.forEach(([key, threshhold]) =>
      percentValue > threshhold ? (backgroundColor = key) : undefined
    );
  }

  return (
    <div className="progress" style={{ height, marginBottom: '15px' }}>
      <div
        className={`progress-bar`}
        style={{
          backgroundColor: `${backgroundColor}`,
          width: `${percentValueString}%`
        }}
        role="progressbar"
        aria-valuenow={percentValue}
        aria-valuemin={min}
        aria-valuemax={max}
      />
    </div>
  );
};

ProgressBar.defaultProps = defaultProgressBarProps;

export default ProgressBar;
