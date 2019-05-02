# Superset Connector

This connector module uses an fetch-based API submodule to access slice data via Superset's new slice API endpoint. The API connector module uses simple configurations to construct and execute an AJAX request via [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Usage

Import the Connector into a module and Request resources from Superset:

```js
import superset from '@onaio/superset-connector';

const fetchConfig = {
  endpoint: 'slice',
  extraPath: '1',
  base: 'http://localhost:8088/'
};

const fetchMiddleware = res => res;

const fetchCallback = parsedResponse => {
  const sliceData = superset.processData(parsedResponse);
  return doSomethingWithData(data);
};

superset.api.doFetch(fetchConfig, fetchMiddleware).then(fetchCallback);
```

### API Fetch Config

(required) Object contaning options / credentials

```js
// config.endpoint - (required) API Key value to determine API Path
// config.extraPath- (required) ID number of the resource being requested
// config.method   - (optional) Specify HTTP Method (defaults to GET)
// config.mimeType - (optional) Specify mimeType for Request Headers
// config.base     - (optional) Base URL for API Requests, must include trailing '/'
// config.credentials(optional) Custom override for Fetch API 'credentials' setting
```

### API Fetch Middleware

(optional) Function to modify the raw FetchAPI Response. Defautls to `(res) => res`

### API Fetch Callback

(optional) Function to handle response, otherwise the response is simply returned

### Gisida Usage

For use within the context of a Gisida client, add the following to Gisida's `site-config.APP` settings:

```js
APP: {
  ...,


  "supersetAuth": true,
  // Required - Determines if Gisida login / logout functionalities should AuthZ/DeAuthZ for Superset.


  "supersetBase": "https://canopy.client-site.com/"
  // Required - Points to the relevant instance of Canopy Superset, must include trailing `/`
                (use `http://localhost:8088/` if running onaio/docker-compose-canopy locally)

},
```
