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
export declare const trackPage: (page: string) => void;
/**
 * Default values for react ga initialization options
 */
export declare const defaultInitializeOptions: InitializeOptions;
/**
 * Helper function to initialize Google Analytics
 * @param {string} trackingCode Google analytics tracking code
 * @param {InitializeOptions} initializeOptions React GA initialization options
 * @returns {boolean} True if initialization was successful, false otherwise
 */
export declare const initGoogleAnalytics: (
  trackingCode: string,
  initializeOptions?: GoogleAnalytics.InitializeOptions
) => boolean;
/**
 * Helper function to set custom dimensions
 * @param {Dimensions} dimensions User attributes to track
 */
export declare const setDimensions: (dimensions: Dimensions) => void;
