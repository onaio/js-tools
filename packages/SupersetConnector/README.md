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

### Filtering data from Superset

Included is a utility called `getFormData` which can be used to construct Superset filter options.

`getFormData` takes the following parameters:

- **rowLimit** (optional): the number of rows to return from Superset
- **filters** (optional): array of filters to be sent to Superset
- **ordering** (optional): an object containing fields to order by e.g. {plan: true} ==> order by the plan field ascending (false would mean descending)

#### filters

The filters option can be either:

- **Simple filter** e.g. `{ comparator: '10f9e9fa', operator: '==', subject: 'plan_id'}`
- **SQL filter** e.g. `{ sqlExpression: "plan_id = '10f9e9fa'" }`

#### Example usage

```ts
import superset from '@onaio/superset-connector';

const rowLimit = 50; // return 50 rows
const filters = [
  // filter where plan_id == '10f9e9fa' AND target > 100
  { sqlExpression: "target > 200" },
  { comparator: '10f9e9fa', operator: '==', subject: 'plan_id'},
];
const ordering = {plan: true, goal: false}; // order by plan ascending and goal descending

// construct the formData object
const formData = superset.getFormData(rowLimit, filters, comparator);

// construct the configs
const config = {
  endpoint: 'slice',
  extraPath: '892',
  params: `form_data=${JSON.stringify(formData)}`
  token: '123'
}

// finally
const data = await superset.api.doFetch(config);
```

Both of the above filters do the same thing i.e. filter where plan_id == '10f9e9fa'

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
