import React from 'react';

/** Props for ProgressBar */
interface ProgressBarProps {
  anime: boolean;
  decimalPoints: number;
  height: string;
  min: number;
  max: number;
  value: number;
  lineColor: string;
  lineColorThresholds?: { [key: string]: number } | undefined;
  showLabel: boolean;
  stripped: boolean;
}

/** default props for ProgressBar */
const defaultProgressBarProps: Partial<ProgressBarProps> = {
  anime: false,
  decimalPoints: 0,
  height: '10px',
  lineColor: '#0000FF',
  lineColorThresholds: undefined,
  max: 100,
  min: 0,
  showLabel: false,
  stripped: false,
  value: 0
};

/** Displays configurable progress bar
 * lineColor prop when you don't require different line colors
 * lineColorThresholds when you have to match lineColors to certain value thresholds.
 * LineColorThresholds will take precedence over lineColor if both are provided
 */
const ProgressBar = (props: ProgressBarProps) => {
  const {
    anime,
    decimalPoints,
    value,
    lineColor,
    stripped,
    lineColorThresholds,
    showLabel
  } = props;
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

  // set the line color: if lineColorThresholds is not given; lineColor will be used
  if (lineColorThresholds) {
    // sort the color and their thresholds by the threshold value
    const AscendingThresholds = Object.entries(lineColorThresholds).sort((e1, e2) => e1[1] - e2[1]);
    // top to bottom check to see which color threshold is matched first by the percentValue
    AscendingThresholds.forEach(([key, threshold]) => {
      if (percentValue >= threshold) {
        backgroundColor = key;
      }
    });
  }

  return (
    <div className="progress">
      <div
        className={`progress-bar ${stripped ? 'progress-bar-striped' : ''}
        ${anime ? 'progress-bar-striped progress-bar-animated' : ''}`}
        style={{
          backgroundColor: `${backgroundColor}`,
          width: `${percentValueString}%`
        }}
        role="progressbar"
        aria-valuenow={percentValue}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {showLabel ? `${percentValue}%` : null}
      </div>
    </div>
  );
};

ProgressBar.defaultProps = defaultProgressBarProps;

export default ProgressBar;
