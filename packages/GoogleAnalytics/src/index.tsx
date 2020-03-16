import { InitializeOptions } from 'react-ga';
import { RouteTracker } from './components/GARoute';
import WithGATracker from './components/WithGATracker';
import { Dimensions, initGoogleAnalytics, setDimensions } from './helpers';

export {
  WithGATracker,
  RouteTracker,
  initGoogleAnalytics,
  Dimensions,
  InitializeOptions,
  setDimensions
};