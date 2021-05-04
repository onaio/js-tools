import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import { FactoryParameters, Props } from 'react-mapbox-gl/lib/map';
import { Events } from 'react-mapbox-gl/lib/map-events';
/** interface for  GisidaLite props */
export interface GisidaLiteProps {
  layers: JSX.Element[];
  Mapbox: typeof React.Component;
  mapConfigs: Props & Events;
  mapComponents: JSX.Element[];
  reactMapboxGlMapFactoryUtilConfigs: FactoryParameters;
}
/** Default props for GisidaLite */
export declare const gisidaLiteDefaultProps: GisidaLiteProps;
/**
 * Simple React mapbox gl renderer :)
 *
 * Inspired by GisidaLite component in reveal
 */
declare const GisidaLite: {
  (props: GisidaLiteProps): JSX.Element | null;
  defaultProps: GisidaLiteProps;
};
/**
 * Custom equality method for React.memo
 * @param prevProps
 * @param nextProps
 */
export declare const arePropsEqual: (
  prevProps: GisidaLiteProps,
  nextProps: GisidaLiteProps
) => boolean;
declare const MemoizedGisidaLite: React.MemoExoticComponent<{
  (props: GisidaLiteProps): JSX.Element | null;
  defaultProps: GisidaLiteProps;
}>;
export { GisidaLite, MemoizedGisidaLite };
