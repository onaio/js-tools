/** utility function to return a copy of the data from a parsed slice_json response */
export const processData = (res: { [key: string]: any }) => {
  return (
    res && res.data && res.data.records && Array.isArray(res.data.records) && [...res.data.records]
  );
};

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

/** Type definition callback function  */
export type SupersetCallback<T> = (e: T) => any;

/** Allowed Superset filter operators */
export type SupersetFilterOperators =
  | '=='
  | '!='
  | '>='
  | '<='
  | '<'
  | '>'
  | 'LIKE'
  | 'in'
  | 'not+in'
  | 'IS+NULL'
  | 'IS+NOT+NULL';

/** Superset ad-hoc filter options */
export interface SupersetAdhocFilterOption {
  comparator: string | number | string[] | number[];
  operator: SupersetFilterOperators;
  subject: string;
}

/** Superset SQL filter options */
export interface SupersetSQLFilterOption {
  sqlExpression: string;
}

/** Interface to describe Superset filter options */
export interface SupersetFilter {
  comparator?: string | number | string[] | number[];
  clause: 'WHERE';
  expressionType: 'SIMPLE' | 'SQL';
  operator?: SupersetFilterOperators;
  sqlExpression?: string;
  subject?: string;
}

/** Default superset filter options */
const defaultFilter: SupersetFilter = {
  clause: 'WHERE',
  expressionType: 'SIMPLE'
};

/** Interface to describe Superset form data */
export interface SupersetFormData {
  adhoc_filters?: SupersetFilter[];
  row_limit: number;
}
