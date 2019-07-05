import superset from '..';
import { parsedSliceResponse, sliceResponse } from './fixtures';
/* tslint:disable-next-line no-var-requires */
const fetch = require('jest-fetch-mock');

describe('superset-connector', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should authorize a user using an Ona token', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const authZstatus = await superset.authZ(
      {
        token: 'abcdefghij'
      },
      res => res.status
    );
    expect(authZstatus).toEqual(200);
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8088/oauth-authorized/onadata');
  });

  it('should work with dynamic provider', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const authZstatus = await superset.authZ(
      {
        base: 'https://opensrp.example.com/',
        provider: 'opensrp',
        token: 'justMOSH'
      },
      res => res.status
    );
    expect(authZstatus).toEqual(200);
    expect(fetch.mock.calls[0][0]).toEqual('https://opensrp.example.com/oauth-authorized/opensrp');
  });

  it('should not authorize a user using an expired Ona token', async () => {
    fetch.mockRejectOnce(JSON.stringify({ status: 302 }));
    const authZstatus = await superset.authZ(
      {
        token: 'abcdefghij'
      },
      res => {
        return JSON.parse(res as any).status;
      }
    );
    expect(authZstatus).toEqual(302);
  });

  it('should fetch from the Slice API without a callback', async () => {
    fetch.mockResponseOnce(JSON.stringify(sliceResponse));
    const res = await superset.api.doFetch({
      endpoint: 'slice',
      extraPath: '892',
      token: 'hunter2'
    });
    expect(res).toEqual(sliceResponse);
  });

  it('should fetch from the Slice API with a callback', async () => {
    fetch.mockResponseOnce(JSON.stringify(sliceResponse));
    const data = await superset.api.doFetch(
      {
        endpoint: 'slice',
        extraPath: '892',
        token: 'hunter2'
      },
      res => superset.processData(res)
    );
    expect(data).toEqual(parsedSliceResponse);
  });

  it('should fetch CSV just fine', async () => {
    const csvData = 'id,a,b,c,d\n' + '0,1,1,1,1\n' + '1,2,2,2,2\n' + '2,3,3,3,3';
    fetch.mockResponseOnce(csvData, {
      headers: { 'content-type': 'text/csv;charset=UTF-8' },
      status: 200
    });
    const data = await superset.api.doFetch({
      endpoint: 'slice',
      extraPath: '892',
      mimeType: 'text/csv',
      token: 'hunter2'
    });
    expect(data).toEqual([
      { a: '1', b: '1', c: '1', d: '1', id: '0' },
      { a: '2', b: '2', c: '2', d: '2', id: '1' },
      { a: '3', b: '3', c: '3', d: '3', id: '2' }
    ]);
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
