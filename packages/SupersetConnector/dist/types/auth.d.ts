import { SupersetCallback, SupersetConnectorConfig } from './utils';
/** Authorization Request
 * @param {SupersetConnectorConfig} config - the configuration options
 * @param {SupersetCallback<any>} callback - the callback function
 */
export declare const authZ: (
  config: SupersetConnectorConfig,
  callback: SupersetCallback<Response>
) => Promise<any>;
/** De-Authorization Request
 * @param {SupersetConnectorConfig} config - the configuration options
 * @param {SupersetCallback<any>} callback - the callback function
 */
export declare const deAuthZ: (
  config: SupersetConnectorConfig,
  callback: SupersetCallback<Response>
) => Promise<any>;
declare const _default: {
  authZ: (config: SupersetConnectorConfig, callback: SupersetCallback<Response>) => Promise<any>;
  deAuthZ: (config: SupersetConnectorConfig, callback: SupersetCallback<Response>) => Promise<any>;
};
export default _default;
