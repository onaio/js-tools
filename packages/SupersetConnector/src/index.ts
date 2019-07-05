import { API } from './api';
import { authZ, deAuthZ } from './auth';
import { getSupersetFormData, processData } from './utils';

/** Superset Connector Module */
const superset = {
  api: new API(),
  authZ,
  deAuthZ,
  getSupersetFormData,
  processData
};

export default superset;
