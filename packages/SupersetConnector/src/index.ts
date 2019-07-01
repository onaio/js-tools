import { API } from './api';
import { authZ, deAuthZ } from './auth';
import { processData } from './utils';

/** Superset Connector Module */
const superset = {
  api: new API(),
  authZ,
  deAuthZ,
  processData
};

export default superset;
