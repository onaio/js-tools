import React from 'react';
import './legend.css';
import { legendBlockBuilder } from './utils/helpers';

/** legend data type */
export interface LegendBlock {
  color: string;
  fillWidth: string;
  label: string;
}
/** Legend props */
export interface LegendProps {
  legendData: LegendBlock[];
  legendCreditText: string;
}

/** Default props for GisidaLite */
export const defaultLegendProps: LegendProps = {
  legendCreditText: 'Age break down',
  legendData: [
    { color: '#bdd7e7', fillWidth: '33px', label: '0' },
    { color: '#4292c6', fillWidth: '33px', label: '1-2' },
    { color: '#2171b5', fillWidth: '33px', label: '3-6' },
    { color: '#08519c', fillWidth: '33px', label: '6-11' },
    { color: '#08306b', fillWidth: '33px', label: '12-16' }
  ]
};
const Legend = (props: LegendProps) => {
  const { legendData, legendCreditText } = props;
  const background: JSX.Element[] = [];
  legendData.forEach((legendBlock: LegendBlock, index: number) => {
    background.push(
      legendBlockBuilder(legendBlock.color, legendBlock.fillWidth, legendBlock.label)
    );
  });
  return (
    <div className="legend">
      <div className="legend-fill legend-label">
        <ul id="legend-background">{background}</ul>
      </div>
      <span>{legendCreditText}</span>
    </div>
  );
};
Legend.defaultProps = defaultLegendProps;

export { Legend };
