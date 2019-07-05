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

/** Interface to describe Superset ordering options */
export interface SupersetOrderingOptions {
  [key: string]: boolean;
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
  order_by_cols?: any;
  row_limit: number;
}

/** Get form data parameter
 * @param {number} rowLimit - the number of rows to return from Superset
 * @param {Array<SupersetSQLFilterOption | SupersetAdhocFilterOption>} filters - array of filters to be sent to Superset
 * @param {SupersetOrderingOptions} ordering - an object containing fields to order by e.g. {plan: true} ==> order by the plan field ascending (false would mean descending)
 * @returns {SupersetFormData} form data object
 */
export function getFormData(
  rowLimit: number = 1000,
  filters: Array<SupersetSQLFilterOption | SupersetAdhocFilterOption> = [],
  ordering: SupersetOrderingOptions = {}
): SupersetFormData {
  const adhocFilters: SupersetFilter[] = filters.map(
    (filter): SupersetFilter => {
      if (filter.hasOwnProperty('sqlExpression')) {
        filter = filter as SupersetSQLFilterOption;
        return {
          ...defaultFilter,
          expressionType: 'SQL',
          sqlExpression: filter.sqlExpression
        };
      } else {
        filter = filter as SupersetAdhocFilterOption;
        return {
          ...defaultFilter,
          comparator: filter.comparator,
          operator: filter.operator,
          subject: filter.subject
        };
      }
    }
  );

  const orderByCols = Object.keys(ordering).map(key => {
    return `[\"${key}\",+${ordering[key].toString()}]`;
  });

  return {
    ...(orderByCols.length > 0 && { order_by_cols: orderByCols }),
    ...(adhocFilters.length > 0 && { adhoc_filters: adhocFilters }),
    row_limit: rowLimit
  };
}
