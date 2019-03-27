/**
 * Authorization Request
 * @param {Object<string>=} config - Overrides DeAuth URI Basepath, requires trailing '/'
 * @param {Function} callback - Callback function to receive Fetch API res / err object
 * @returns {Promise}
 */
export const authZ = (config, callback) => {
  const headers = new Headers();
  headers.append('Custom-Api-Token', config.token);

  return fetch(`${config.base || 'http://localhost:8088/'}oauth-authorized/onadata`, {
    headers,
    method: 'GET',
    credentials: 'include'
  })
    .then(res => callback(res))
    .catch(err => callback(err));
};

/**
 * De-Authorization Request
 * @param {Object<string>=} config - Overrides DeAuth URI Basepath, requires trailing '/'
 * @param {Function} callback - Callback function to receive Fetch API res / err object
 * @returns {Promise}
 */
export const deAuthZ = (config, callback) =>
  fetch(`${(config && config.base) || 'http://localhost:8088/'}logout/`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => callback(res))
    .catch(err => callback(err));

export default {
  authZ,
  deAuthZ
};
