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

```ts
/** interface to describe configuration options */
export interface SupersetConnectorConfig {
  credentials?: RequestCredentials /** Custom override for Fetch API 'credentials' setting */;
  base?: string /** Overrides Auth URI Basepath, requires trailing '/' */;
  endpoint?: string /** The endpoint to hit on the Superset API */;
  extraPath?: string /** url path to append when hitting the Superset API */;
  method?: string /** Specify HTTP Method (defaults to GET) */;
  mimeType?: string /** Specify mimeType for Request Headers */;
  params?: string /** Additional parameters to be appended to API Path */;
  provider?: string /** oAuth2 Provider name as a string */;
  token: string /** oAuth2 Access Token as a string */;
}
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
