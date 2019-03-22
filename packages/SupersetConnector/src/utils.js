import { parse } from 'papaparse';

export function parseCSV(text, config) {
  return parse(
    text,
    config || {
      header: true,
      skipEmptyLines: true
    }
  ).data;
}

export default {
  parseCSV
};
