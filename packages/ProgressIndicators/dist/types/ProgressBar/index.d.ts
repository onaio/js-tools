/// <reference types="react" />
/** Props for ProgressBar */
interface ProgressBarProps {
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
  cssClass: string /** sets either stripped or animated css gradient over progressBar */;
  showLabel: boolean /** set label on progressBar */;
  stripped: boolean /** set strips in progressBar */;
}
/** Displays configurable progress bar */
declare const ProgressBar: {
  (props: ProgressBarProps): JSX.Element;
  defaultProps: {
    animate: boolean;
    cssClass: string;
    decimalPoints: number;
    height: string;
    lineColor: string;
    lineColorThresholds: undefined;
    max: number;
    min: number;
    showLabel: boolean;
    stripped: boolean;
    value: number;
  };
};
export default ProgressBar;
