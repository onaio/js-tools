import memoize from 'memoize-one';
import GoogleAnalytics, { FieldsObject, InitializeOptions } from 'react-ga';

/**
 * Interface defining the visitor attributes been tracked
 */
export interface Dimensions extends FieldsObject {
  env?: string;
  username?: string;
}

/**
 * helper function to execute the page view Google Analytics tracking
 * @param {string} page the url string of the page view being tracked
 */
export const trackPage = (page: string): void => {
  GoogleAnalytics.pageview(page);
};

/**
 * Default values for react ga initialization options
 */
export const defaultInitializeOptions: InitializeOptions = {
  testMode: false
};

/**
 * Helper function to initialize Google Analytics
 * @param {string} trackingCode Google analytics tracking code
 * @param {InitializeOptions} initializeOptions React GA initialization options
 * @returns {boolean} True if initialization was successful, false otherwise
 */
export const initGoogleAnalytics = memoize(
  (
    trackingCode: string,
    initializeOptions: InitializeOptions = defaultInitializeOptions
  ): boolean => {
    const isGAEnabled = !!(trackingCode && trackingCode.length);

    if (isGAEnabled) {
      GoogleAnalytics.initialize(trackingCode, initializeOptions);
    }

    return isGAEnabled;
  }
);

/**
 * Helper function to set custom dimensions
 * @param {Dimensions} dimensions User attributes to track
 */
export const setDimensions = memoize((dimensions: Dimensions): void => {
  GoogleAnalytics.set(dimensions);
});
