import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import {
  arePropsEqual,
  gisidaLiteDefaultProps,
  GisidaLiteProps,
  MemoizedGisidaLite,
  ReactMapboxGlProps
} from '..';

jest.mock('react-mapbox-gl');

describe('component/GisidaLite', () => {
  it('renders without crashing', () => {
    shallow(<MemoizedGisidaLite {...gisidaLiteDefaultProps} />);
  });
  it('renders props correctly', () => {
    const wrapper = mount(<MemoizedGisidaLite {...gisidaLiteDefaultProps} />);
    expect(wrapper.props()).toMatchSnapshot('gisida lite props');
  });
  it('renders component correctly', () => {
    const wrapper = mount(<MemoizedGisidaLite {...gisidaLiteDefaultProps} />);
    expect(toJson(wrapper)).toMatchSnapshot('gisida lite render');
  });
  it('reacts to props changes accordingly in relation to ReactMapboxGl constructor', () => {
    const updatedReactMapboxglProps = {
      accessToken: '',
      attributionControl: true,
      customAttribution: '',
      injectCSS: true
    };
    const mockReactMapboxGlMock = jest.fn();
    (ReactMapboxGl as jest.Mock).mockImplementationOnce(() => mockReactMapboxGlMock);

    const wrapper = mount(<MemoizedGisidaLite {...gisidaLiteDefaultProps} />);
    expect(mockReactMapboxGlMock).toHaveBeenCalledTimes(1);
    expect(wrapper.props().reactMapboxGlMapFactoryUtilConfigs).toEqual(ReactMapboxGlProps);
    // should not re-instanciate reactmapboxgl on other props change
    wrapper.setProps({
      ...gisidaLiteDefaultProps,
      layers: []
    });
    expect(mockReactMapboxGlMock).toHaveBeenCalledTimes(1);
    expect(wrapper.props().reactMapboxGlMapFactoryUtilConfigs).toEqual(ReactMapboxGlProps);
    // should re-instanciate map on reactmapboxgl factory options change
    wrapper.setProps({
      ...gisidaLiteDefaultProps,
      reactMapboxGlMapFactoryUtilConfigs: updatedReactMapboxglProps
    });
    expect(wrapper.props().reactMapboxGlMapFactoryUtilConfigs).toEqual(updatedReactMapboxglProps);
  });
  it('returns false if layers length has changed', () => {
    const prevProps = {
      ...gisidaLiteDefaultProps,
      layers: []
    };
    const nextProps = {
      ...gisidaLiteDefaultProps
    };
    expect(arePropsEqual(prevProps, nextProps)).toEqual(false);
  });

  it('returns true if length has not changed', () => {
    const prevProps: GisidaLiteProps = {
      ...gisidaLiteDefaultProps,
      layers: []
    };
    const nextProps: GisidaLiteProps = {
      ...gisidaLiteDefaultProps,
      layers: []
    };
    expect(arePropsEqual(prevProps, nextProps)).toEqual(true);
  });
});
