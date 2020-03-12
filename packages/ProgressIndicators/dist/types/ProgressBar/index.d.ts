import { Component } from 'react';
/** Props for ProgressBar */
export interface ProgressBarProps {
  animate: boolean /** apply animation to progressBar */;
  decimalPoints: number /** Rounds off the value to this number of decimal places */;
  height: string /** resizes the height of the progressBar */;
  min: number /** set lower bound for the progressBar range */;
  max: number /** set upper bound for the progressBar range */;
  value: number /** Represents the progress bar value */;
  lineColor: string /** set line colors */;
  lineColorThresholds?: {
    [key: string]: number;
  } /** set linecolor threshold */;
  cssClass: string /** sets css gradient over progressBar */;
  showLabel: boolean /** set label on progressBar */;
  stripped: boolean /** set strips in progressBar */;
}
/** default props for ProgressBar */
export declare const defaultProgressBarProps: Partial<ProgressBarProps>;
/** Displays configurable progress bar */
declare class ProgressBar extends Component<ProgressBarProps, {}> {
  public static defaultProps: Partial<ProgressBarProps>;
  constructor(props: ProgressBarProps);
  public render(): JSX.Element;
}
export default ProgressBar;
