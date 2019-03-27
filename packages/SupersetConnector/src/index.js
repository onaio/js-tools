import { API } from './api';
import { authZ, deAuthZ } from './auth';

/**
 * Data Processor Utility
 * @param {Object} res - Parsed response object returned from slice_json request
 * @returns {Array<Object>} - Array of records pertaining to the requested slice
 */
const processData = res => {
  return (
    res && res.data && res.data.records && Array.isArray(res.data.records) && [...res.data.records]
  );
};

/**
 * FE Superset Connector Module
 * @type {Object<Object, Function>}
 */
const Superset = {
  api: new API(),
  processData,
  authZ,
  deAuthZ
};

export default Superset;
