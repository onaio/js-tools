import { SupersetCallback, SupersetConnectorConfig } from './utils';
/** Generate Request for Fetch API */
export declare const apiRequest: (config: SupersetConnectorConfig, headers: Headers) => Request;
/** API Module for FE Superset Connector */
export declare class API {
  /** Resolve Fetch API Promise, convert to JSON, handle with
   * callback/resolve as JSON
   * @param {SupersetConnectorConfig} config - the configuration options
   * @param {SupersetCallback<any>} callback - the callback function
   * @return {{ [key: string]: any }} the data
   */
  public doFetch: (
    config: SupersetConnectorConfig,
    callback?: SupersetCallback<any>
  ) => {
    [key: string]: any;
  };
  public deferedFetch: any;
  constructor();
}
export default API;
