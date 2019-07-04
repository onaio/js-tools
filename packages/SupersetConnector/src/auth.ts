import { SupersetCallback, SupersetConnectorConfig } from './utils';

/** Authorization Request
 * @param {SupersetConnectorConfig} config - the configuration options
 * @param {SupersetCallback<any>} callback - the callback function
 */
export const authZ = (config: SupersetConnectorConfig, callback: SupersetCallback<Response>) => {
  const headers = new Headers();
  headers.append('Custom-Api-Token', config.token);

  return fetch(
    `${config.base || 'http://localhost:8088/'}oauth-authorized/${config.provider || 'onadata'}`,
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
  fetch(`${(config && config.base) || 'http://localhost:8088/'}logout/`, {
    credentials: 'include',
    method: 'GET'
  })
    .then(res => callback(res))
    .catch(err => callback(err));

export default {
  authZ,
  deAuthZ
};
