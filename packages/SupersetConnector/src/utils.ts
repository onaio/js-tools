/** utility function to return a copy of the data from a parsed slice_json response */
export const processData = (res: { [key: string]: any }) => {
  return (
    res && res.data && res.data.records && Array.isArray(res.data.records) && [...res.data.records]
  );
};
