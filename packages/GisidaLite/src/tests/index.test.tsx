import { shallow } from 'enzyme';
import React from 'react';
import { arePropsEqual, gisidaLiteDefaultProps, GisidaLiteProps, MemoizedGisidaLite } from '../';

describe('component/GisidaLite', () => {
  it('renders without crashing', () => {
    shallow(<MemoizedGisidaLite {...gisidaLiteDefaultProps} />);
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
