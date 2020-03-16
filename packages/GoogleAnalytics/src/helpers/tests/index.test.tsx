import GoogleAnalytics, { InitializeOptions } from 'react-ga';
import {
  defaultInitializeOptions,
  Dimensions,
  initGoogleAnalytics,
  setDimensions,
  trackPage
} from '..';

describe('GARoute/helpers/trackpage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('GoogleAnalytics.pageview is called with correct arguments', () => {
    GoogleAnalytics.pageview = jest.fn();
    trackPage('/');
    expect(GoogleAnalytics.pageview).toBeCalledWith('/');
  });
});

describe('GA/Route/helpers/defaultInitializeOptions', () => {
  it('returns default initialization options correctly', () => {
    const options: InitializeOptions = {
      testMode: false
    };
    expect(defaultInitializeOptions).toEqual(options);
  });
});

describe('GARoute/helpers/trackpage/initGoogleAnalytics', () => {
  it('initializes correctly', () => {
    const options: InitializeOptions = {
      testMode: true
    };
    GoogleAnalytics.initialize = jest.fn();
    const result = initGoogleAnalytics('code', options);
    expect(result).toEqual(true);
    expect(GoogleAnalytics.initialize).toBeCalledWith('code', options);
  });

  it('intializes with default options if no options provided', () => {
    GoogleAnalytics.initialize = jest.fn();
    const result = initGoogleAnalytics('code');
    expect(result).toEqual(true);
    expect(GoogleAnalytics.initialize).toBeCalledWith('code', defaultInitializeOptions);
  });
});

describe('GA/Route/helpers/setDimensions', () => {
  it('calls GoogleAnalytics.set', () => {
    GoogleAnalytics.set = jest.fn();
    const dimensions: Dimensions = {
      env: 'test',
      username: 'superman'
    };
    setDimensions(dimensions);
    expect(GoogleAnalytics.set).toBeCalledWith(dimensions);
  });
});
