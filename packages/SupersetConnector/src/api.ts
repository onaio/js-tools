import { parse, ParseConfig, ParseResult } from 'papaparse';
import { DEFAULT_SUPERSET_PROVIDER } from './constants';
import { SupersetCallback, SupersetConnectorConfig } from './utils';

/** Utility function to parse CSV response to JSON */
function parseCSV(text: string, config: ParseConfig = { header: true, skipEmptyLines: true }) {
  return parse(text, config).data;
}

/** This object is used to map the endpoint from SupersetConnectorConfig to
 * actual url endpoints on the Superset API.
 */
const apiMap: { [key: string]: string } = {
  slice: 'superset/slice_json'
};

/** Generate Headers for Fetch API */
const apiHeaders = (config: SupersetConnectorConfig | null = null): Headers => {
  const headers = new Headers();

  if (!config) {
    return headers;
  }
  if (config.mimeType) {
    headers.append('Content-Type', config.mimeType);
  }

  return headers;
};

/** Generate Request for Fetch API */
const apiRequest = (config: SupersetConnectorConfig, headers: Headers) => {
  const base = config.base || DEFAULT_SUPERSET_PROVIDER;
  let apiPath = `${base}`;

  if (config.endpoint && apiMap.hasOwnProperty(config.endpoint)) {
    apiPath = `${base}${apiMap[config.endpoint]}`;
  }

  const reqConfig: RequestInit = {
    credentials: config.credentials || 'include',
    headers,
    method: config.method || 'GET'
  };

  if (config.extraPath) {
    apiPath = `${apiPath}/${config.extraPath}`;
  }
  if (config.params) {
    apiPath = `${apiPath}?${config.params}`;
  }

  return new Request(apiPath, reqConfig);
};

/** Generate Fetch API Promise */
const fetchAPI = (config: SupersetConnectorConfig) => fetch(apiRequest(config, apiHeaders(config)));

/** API Module for FE Superset Connector */
export class API {
  /** Resolve Fetch API Promise, convert to JSON, handle with
   * callback/resolve as JSON
   * @param {SupersetConnectorConfig} config - the configuration options
   * @param {SupersetCallback<any>} callback - the callback function
   * @return {{ [key: string]: any }} the data
   */
  public doFetch: (
    config: SupersetConnectorConfig,
    callback?: SupersetCallback<any>
  ) => { [key: string]: any };
  public deferedFetch: any;

  constructor() {
    const self = this;

    this.doFetch = async (
      config: SupersetConnectorConfig,
      callback: SupersetCallback<any> = (res: Response) => res
    ) =>
      fetchAPI(config)
        .catch((err: Error) => callback(err))
        .then((res: Response) => {
          /* Define response parse method */
          let parser;
          switch (config.mimeType) {
            case 'text/csv':
              parser = 'text';
              break;
            case 'image/jpeg':
              parser = 'blob';
              break;
            default:
              parser = 'json';
          }

          /* Return parsed Response */
          return (res as any)
            [parser]()
            .then((parsed: string) => {
              /* if parsed text is CSV then return Papaparse via parseCSV */
              if (config.mimeType === 'text/csv') {
                return parseCSV(parsed);
              }
              return parsed;
            })
            .catch((err: Error) => (callback && callback(err)) || { res, err })
            .then((user: ParseResult) => (callback && callback(user)) || { res, user });
        });

    /** version of this.fetch specifically for d3.queue fetching */
    this.deferedFetch = (
      config: SupersetConnectorConfig,
      apiCallback: SupersetCallback<Response>,
      qCallback: any
    ) => {
      return self
        .doFetch(config, apiCallback)
        .then((data: { [key: string]: any }) => qCallback(null, data))
        .catch((err: Error) => qCallback(err, null));
    };
  }
}

export default API;
