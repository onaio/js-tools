import { API } from './api';
import { getFormData } from './utils';
/** Superset Connector Module */
declare const superset: {
  api: API;
  authZ: (
    config: import('./utils').SupersetConnectorConfig,
    callback: import('./utils').SupersetCallback<Response>
  ) => Promise<any>;
  deAuthZ: (
    config: import('./utils').SupersetConnectorConfig,
    callback: import('./utils').SupersetCallback<Response>
  ) => Promise<any>;
  getFormData: typeof getFormData;
  processData: (res: { [key: string]: any }) => false | any[];
};
export default superset;
