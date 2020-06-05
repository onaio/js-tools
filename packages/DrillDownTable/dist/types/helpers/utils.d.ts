import { DrillDownColumn } from '../components/TableJSX';
/** Takes an object and returns columns that are compatible with react-table
 * derived from the object's keys
 */
export declare function columnsFromObjects<D extends object>(items: D[]): Array<DrillDownColumn<D>>;
