import { parse } from 'papaparse';

/**
 * Utility function to parse CSV response to JSON
 * @param {*} text
 * @param {*} config
 * @returns {Array<Object>}
 */
function parseCSV(text, config) {
  return parse(
    text,
    config || {
      header: true,
      skipEmptyLines: true
    }
  ).data;
}

/**
 * Object defining URL paths for different API calls
 * @type {Object<string>}
 */
const apiMap = {
  slice: 'superset/slice_json'
};

/**
 * Generate Headers for Fetch API
 * @param {Object<*>} config
 * @returns {Headers}
 */
const apiHeaders = config => {
  const headers = new Headers();

  if (!config) return headers;
  if (config.mimeType) headers.append('Content-Type', config.mimeType);

  return headers;
};

/**
 * Generate Request for Fetch API
 * @param {Object<*>} config
 * @param {Headers} headers - The headers object used in the request
 * @returns {Request} - The actual request obejct fetch will use
 */
const apiRequest = (config, headers) => {
  const base = config.base || 'http://localhost:8088/';
  let apiPath = `${base}${apiMap[config.endpoint] || ''}`;

  const reqConfig = {
    method: config.method || 'GET',
    credentials: config.credentials || 'include'
  };

  if (headers) reqConfig.headers = headers;
  if (config.extraPath) apiPath = `${apiPath}/${config.extraPath}`;
  if (config.params) apiPath = `${apiPath}?${config.params}`;

  return new Request(apiPath, reqConfig);
};

/**
 * Generate Fetch API Promise
 * @param {Object<*>} config
 * @returns {PromiseLike<*>}
 */
const fetchAPI = config => fetch(apiRequest(config, apiHeaders(config)));

/** API Module for FE Superset Connector */
/**
 *
 */
export class API {
  constructor() {
    const self = this;

    /**
     * Resolve Fetch API Promise, convert to JSON, handle with callback/resolve as JSON
     * @param {Object<*>} config - Object containing options / credentials
     * @returns {PromiseLike<*>}
     */
    this.fetch = async (config, callback = res => res) =>
      fetchAPI(config)
        .catch(err => callback(err))
        .then(res => {
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
          return res[parser]()
            .then(parsed => {
              /* if parsed text is CSV then return Papaparse via parseCSV */
              if (config.mimeType === 'text/csv') return { user: parseCSV(parsed) };
              return parsed;
            })
            .catch(err => (callback && callback(err)) || { res, err })
            .then(user => (callback && callback(user)) || { res, user });
        });

    /**
     * Version of this.fetch specifically for d3.queue fetching
     * @param {Object<*>} config
     * @param {Function} apiCallback - The callback function used after the fetch Promise resolves
     * @param {?} qCallback - The callback function which is required and included by de3.queue
     */
    this.deferedFetch = (config, apiCallback, qCallback) => {
      return self
        .fetch(config, apiCallback)
        .then(data => qCallback(null, data))
        .catch(err => qCallback(err, null));
    };

    // todo - add functionality to resolve multiple fetches
  }
}

export default API;
