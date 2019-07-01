/** utility function to return a copy of the data from a parsed slice_json response */
export const processData = (res: { [key: string]: any }) => {
  return (
    res && res.data && res.data.records && Array.isArray(res.data.records) && [...res.data.records]
  );
};

/** interface to describe configuration options */
export interface Config {
  base?: string /** Overrides Auth URI Basepath, requires trailing '/' */;
  callback: any /** Callback function to receive Fetch API res / err object */;
  provider?: string /** oAuth2 Provider name as a string */;
  token: string /** oAuth2 Access Token as a string */;
}
