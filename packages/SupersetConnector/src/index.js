import { API } from './api';
import { authZ, deAuthZ } from './auth';

// utility function to return a copy of the data from a parsed slice_json response
const processData = res => {
  return (
    res && res.data && res.data.records && Array.isArray(res.data.records) && [...res.data.records]
  );
};

// FE Superset Connector Module
const superset = {
  api: new API(),
  processData,
  authZ,
  deAuthZ
};

export default superset;
