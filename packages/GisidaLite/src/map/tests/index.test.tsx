import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import * as reactMapboxGl from 'react-mapbox-gl';
import {
  arePropsEqual,
  gisidaLiteDefaultProps,
  GisidaLiteProps,
  MemoizedGisidaLite,
  ReactMapboxGlProps
} from '..';

jest.mock('react-mapbox-gl');

afterEach(() => {
  jest.clearAllMocks();
});

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
    const mockReactMapboxGlMock = jest
      .spyOn(reactMapboxGl, 'default')
      .mockReturnValue(() => React.Component);

    const updatedReactMapboxglProps = {
      accessToken: '',
      attributionControl: true,
      customAttribution: '',
      injectCSS: true
    };
    // should instanciate reactmapboxgl
    const wrapper = mount(<MemoizedGisidaLite {...gisidaLiteDefaultProps} />);
    expect(mockReactMapboxGlMock).toBeCalledWith(ReactMapboxGlProps);
    expect(mockReactMapboxGlMock.mock.calls.length).toBe(1);
    expect(wrapper.props().reactMapboxGlConfigs).toEqual(ReactMapboxGlProps);

    // should not re-instanciate reactmapboxgl on other props change
    wrapper.setProps({
      ...gisidaLiteDefaultProps,
      layers: []
    });
    wrapper.update();
    expect(mockReactMapboxGlMock).toBeCalledWith(ReactMapboxGlProps);
    expect(mockReactMapboxGlMock.mock.calls.length).toBe(1);
    expect(wrapper.props().reactMapboxGlConfigs).toEqual(ReactMapboxGlProps);

    // should re-instanciate map on reactmapboxgl factory options change
    wrapper.setProps({
      ...gisidaLiteDefaultProps,
      reactMapboxGlConfigs: updatedReactMapboxglProps
    });
    wrapper.update();
    expect(wrapper.props().reactMapboxGlConfigs).toEqual(updatedReactMapboxglProps);
    expect(mockReactMapboxGlMock).toBeCalledWith(updatedReactMapboxglProps);
    expect(mockReactMapboxGlMock.mock.calls.length).toBe(2);
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
