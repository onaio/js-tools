import { DEFAULT_SUPERSET_PROVIDER, DEFAULT_SUPERSET_URL } from './constants';
import { SupersetCallback, SupersetConnectorConfig } from './utils';

/** Authorization Request
 * @param {SupersetConnectorConfig} config - the configuration options
 * @param {SupersetCallback<any>} callback - the callback function
 */
export const authZ = (config: SupersetConnectorConfig, callback: SupersetCallback<Response>) => {
  const headers = new Headers();
  headers.append('Custom-Api-Token', config.token);

  return fetch(
    `${config.base || DEFAULT_SUPERSET_URL}oauth-authorized/${config.provider ||
      DEFAULT_SUPERSET_PROVIDER}`,
    {
      credentials: 'include',
      headers,
      method: 'GET'
    }
  )
    .then(res => callback(res))
    .catch(err => callback(err));
};

/** De-Authorization Request
 * @param {SupersetConnectorConfig} config - the configuration options
 * @param {SupersetCallback<any>} callback - the callback function
 */
export const deAuthZ = (config: SupersetConnectorConfig, callback: SupersetCallback<Response>) =>
  fetch(`${(config && config.base) || DEFAULT_SUPERSET_URL}logout/`, {
    credentials: 'include',
    method: 'GET'
  })
    .then(res => callback(res))
    .catch(err => callback(err));

export default {
  authZ,
  deAuthZ
};
