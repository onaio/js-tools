/// <reference types="react" />
import './legend.css';
/** legend data type */
export interface LegendBlock {
  color: string;
  fillWidth: string;
  label: string;
}
/** Legend props */
export interface LegendProps {
  legendData: LegendBlock[];
  legendCreditText?: string;
}
/** Default props for GisidaLite */
export declare const defaultLegendProps: LegendProps;
declare const Legend: {
  (props: LegendProps): JSX.Element;
  defaultProps: LegendProps;
};
export { Legend };
