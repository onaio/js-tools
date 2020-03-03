import React from 'react';

/** Props for ProgressBar */
export interface ProgressBarProps {
  animate: boolean /** apply animation to progressBar */;
  decimalPoints: number /** Rounds off the value to this number of decimal places */;
  height: string /** resizes the height of the progressBar */;
  min: number /** set lower bound for the progressBar range */;
  max: number /** set upper bound for the progressBar range */;
  value: number /** Represents the progress bar value */;
  lineColor: string /** set line colors */;
  lineColorThresholds?: { [key: string]: number } /** set linecolor threshold */;
  cssClass: string /** sets css gradient over progressBar */;
  showLabel: boolean /** set label on progressBar */;
  stripped: boolean /** set strips in progressBar */;
}

/** default props for ProgressBar */
export const defaultProgressBarProps = {
  animate: false,
  cssClass: 'progress-bar-striped progress-bar-animated',
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

/** Displays configurable progress bar */
const ProgressBar = (props: ProgressBarProps) => {
  const {
    animate,
    decimalPoints,
    value,
    lineColor,
    stripped,
    lineColorThresholds,
    showLabel,
    cssClass
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
        className={`progress-bar ${stripped ? cssClass : ''}
        ${animate ? cssClass : ''}`}
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
