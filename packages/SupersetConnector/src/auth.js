// Authorization Request
// config.token - (Required) ONA oAuth2 Access Token as a string
// config.base  - (Optional) Overrides Auth URI Basepath, requires trailing '/'
// callback     - (Required) Callback function to receive Fetch API res / err object
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

// De-Authorization Request
// config.base  - (Optional) Overrides DeAuth URI Basepath, requires trailing '/'
// callback     - (Required) Callback function to receive Fetch API res / err object
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
