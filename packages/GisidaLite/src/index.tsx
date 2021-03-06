import { isEqual } from 'lodash';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useMemo } from 'react';
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl } from 'react-mapbox-gl';
import { FactoryParameters, Props } from 'react-mapbox-gl/lib/map';
import { Events } from 'react-mapbox-gl/lib/map-events';
import {
  DEFAULT_ACCESS_TOKEN,
  DEFAULT_ATTRIBUTION,
  DEFAULT_CONTAINER_STYLES,
  DEFAULT_STYLES,
  GEOJSON_DATA
} from './constants';
/** ReactMapboxGlProps & mapProps props */
export const ReactMapboxGlProps = {
  accessToken: DEFAULT_ACCESS_TOKEN,
  attributionControl: true,
  customAttribution: DEFAULT_ATTRIBUTION,
  injectCSS: true
};
const mapProps = {
  containerStyle: DEFAULT_CONTAINER_STYLES,
  style: DEFAULT_STYLES
};

/** interface for  GisidaLite props */
export interface GisidaLiteProps {
  layers: JSX.Element[];
  mapConfigs: Props & Events;
  mapComponents: JSX.Element[];
  reactMapboxGlConfigs: FactoryParameters;
}

/** Default props for GisidaLite */
export const gisidaLiteDefaultProps: GisidaLiteProps = {
  layers: [
    <GeoJSONLayer
      key="geoLayer"
      data={GEOJSON_DATA}
      symbolLayout={{
        'icon-image': 'triangle-15'
      }}
    />
  ],
  mapComponents: [
    <ZoomControl key="zoomCtrl" position="top-right" />,
    <ScaleControl key="scalectrl" position="bottom-left" />
  ],
  mapConfigs: mapProps,
  reactMapboxGlConfigs: ReactMapboxGlProps
};

/**
 * Simple React mapbox gl renderer :)
 *
 * Inspired by GisidaLite component in reveal
 */

const GisidaLite = (props: GisidaLiteProps) => {
  const { mapConfigs, reactMapboxGlConfigs, mapComponents, layers } = props;
  /**
   * Re-instanciate Mapbox on configs change only
   */
  const Mapbox = useMemo<typeof React.Component>(() => {
    return ReactMapboxGl(reactMapboxGlConfigs);
  }, [reactMapboxGlConfigs]);
  return Mapbox ? (
    <Mapbox {...mapConfigs}>
      <>
        {layers}
        {mapComponents}
      </>
    </Mapbox>
  ) : null;
};

GisidaLite.defaultProps = gisidaLiteDefaultProps;

/**
 * Custom equality method for React.memo
 * @param prevProps
 * @param nextProps
 */
export const arePropsEqual = (prevProps: GisidaLiteProps, nextProps: GisidaLiteProps): boolean => {
  return isEqual(prevProps.layers, nextProps.layers);
};

const MemoizedGisidaLite = React.memo(GisidaLite, arePropsEqual);

export { GisidaLite, MemoizedGisidaLite };
