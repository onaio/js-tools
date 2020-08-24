import { Color } from 'csstype';
import React, { Component } from 'react';

export const GREEN_THRESHOLD = 0.9;
export const YELLOW_THRESHOLD = 0.2;
export const ORANGE_THRESHOLD = 0.8;

export interface IndicatorThresholdItem {
  color: Color;
  name: string;
  orEquals?: boolean;
  value: number;
}

/** Props for ProgressBar */
export interface ProgressBarProps {
  animate: boolean /** apply animation to progressBar */;
  decimalPoints: number /** Rounds off the value to this number of decimal places */;
  height: string /** resizes the height of the progressBar */;
  min: number /** set lower bound for the progressBar range */;
  max: number /** set upper bound for the progressBar range */;
  value: number /** Represents the progress bar value */;
  lineColorThresholds?: { [key: string]: IndicatorThresholdItem } /** set linecolor threshold */;
  cssClass: string /** sets css gradient over progressBar */;
  showLabel: boolean /** set label on progressBar */;
  stripped: boolean /** set strips in progressBar */;
}

/** default props for ProgressBar */
export const defaultProgressBarProps: Partial<ProgressBarProps> = {
  animate: false,
  cssClass: 'progress-bar-striped',
  decimalPoints: 0,
  height: '10px',
  lineColorThresholds: undefined,
  max: 100,
  min: 0,
  showLabel: false,
  stripped: false,
  value: 0
};

export function getColor(lineColorThresholds, percentValue) {
  const ascendingThresholds = Object.keys(lineColorThresholds).sort(
    (e1, e2) => lineColorThresholds[e1].value - lineColorThresholds[e2].value
  );

  // top to bottom check to see which color threshold is matched first by the percentValue
  for (const item of ascendingThresholds) {
    if (
      lineColorThresholds[item].orEquals
        ? percentValue <= lineColorThresholds[item].value * 100
        : percentValue < lineColorThresholds[item].value * 100
    ) {
      return lineColorThresholds[item].color;
    }
  }
}

/** Displays configurable progress bar */
class ProgressBar extends Component<ProgressBarProps, {}> {
  public static defaultProps = defaultProgressBarProps;

  constructor(props: ProgressBarProps) {
    super(props);
  }

  public render() {
    const { props } = this;
    const {
      animate,
      decimalPoints,
      value,
      cssClass,
      stripped,
      lineColorThresholds,
      showLabel
    } = props;

    const max = props.max || 100;
    const min = props.min || 0;
    let range = max - min;
    if (range <= 0) {
      range = 100;
    }
    const decimalValue = value / range;
    const percentValue = decimalValue * 100;
    const percentValueString = percentValue.toFixed(decimalPoints);

    const backgroundColor = lineColorThresholds
      ? getColor(lineColorThresholds, percentValue)
      : decimalValue >= GREEN_THRESHOLD
      ? '#33ad33'
      : decimalValue >= ORANGE_THRESHOLD
      ? '#ff8533'
      : decimalValue >= YELLOW_THRESHOLD
      ? '#ff5c33'
      : '#ff3';

    return (
      <div className="progress">
        <div
          className={`progress-bar ${stripped ? cssClass : ''}
          ${animate ? `${cssClass} progress-bar-animated` : ''}`}
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
  }
}

export default ProgressBar;
