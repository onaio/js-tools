import { API } from './api';
import { authZ, deAuthZ } from './auth';
import { getFormData, processData } from './utils';

/** Superset Connector Module */
const superset = {
  api: new API(),
  authZ,
  deAuthZ,
  getFormData,
  processData
};

export default superset;
