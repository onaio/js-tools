import superset from '..';
import { sliceResponse, parsedSliceResponse } from './fixtures';

global.fetch = require('jest-fetch-mock');

describe('superset-connector', () => {
  it('should authorize a user using an Ona token', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const authZstatus = await superset.authZ(
      {
        token: 'abcdefghij'
      },
      res => res.status
    );
    expect(authZstatus).toEqual(200);
  });

  it('should not authorize a user using an expired Ona token', async () => {
    fetch.mockRejectOnce({ status: 302 });
    const authZstatus = await superset.authZ(
      {
        token: 'abcdefghij'
      },
      res => res.status
    );
    expect(authZstatus).toEqual(302);
  });

  it('should fetch from the Slice API without a callback', async () => {
    fetch.mockResponseOnce(JSON.stringify(sliceResponse));
    const res = await superset.api.fetch({
      endpoint: 'slice',
      extraPath: '892'
    });
    expect(res).toEqual(sliceResponse);
  });

  it('should fetch from the Slice API with a callback', async () => {
    fetch.mockResponseOnce(JSON.stringify(sliceResponse));
    const data = await superset.api.fetch(
      {
        endpoint: 'slice',
        extraPath: '892'
      },
      res => superset.processData(res)
    );
    expect(data).toEqual(parsedSliceResponse);
  });

  it('should parse Slice data from Slice response', () => {
    expect(superset.processData(sliceResponse)).toEqual(parsedSliceResponse);
  });

  it('should de-authorize a user', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const resStatus = await superset.deAuthZ(null, res => res.status);
    expect(resStatus).toEqual(200);
  });
});
