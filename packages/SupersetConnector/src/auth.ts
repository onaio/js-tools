import { SupersetCallback, SupersetConnectorConfig } from './utils';

/* Authorization Request
 ** config.token    - (Required) oAuth2 Access Token as a string
 ** config.provider - (Optional) oAuth2 Provider name as a string
 ** config.base     - (Optional) Overrides Auth URI Basepath, requires trailing '/'
 ** callback        - (Required) Callback function to receive Fetch API res / err object
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

/* De-Authorization Request
 ** config.base  - (Optional) Overrides DeAuth URI Basepath, requires trailing '/'
 ** callback     - (Required) Callback function to receive Fetch API res / err object
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
