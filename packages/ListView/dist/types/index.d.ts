import React from 'react';
/** Type definition for renderHeaderFunc */
export declare type renderHeadersFuncType = (
  items?: React.ReactNode[],
  theadClass?: string,
  thClass?: string,
  trClass?: string
) => JSX.Element | null;
/** Type definition for renderRowsFunc */
export declare type renderRowsFuncType = (
  rowData: React.ReactNode[][],
  tbClass?: string,
  tdClass?: string,
  trClass?: string
) => JSX.Element;
/** Renders header section of a table */
export declare function renderHeadersFunc(
  items?: React.ReactNode[],
  theadClass?: string,
  thClass?: string,
  trClass?: string
): JSX.Element | null;
/** Renders body section of the table */
export declare function renderRowsFunc(
  rowData: React.ReactNode[][],
  tbClass?: string,
  tdClass?: string,
  trClass?: string
): JSX.Element;
/** Interface to define props for ListView */
export interface ListViewProps {
  data: React.ReactNode[][];
  headerItems: React.ReactNode[];
  tableClass: string;
  tbodyClass: string;
  tdClass: string;
  theadClass: string;
  thClass: string;
  trClass: string;
  renderHeaders: renderHeadersFuncType;
  renderRows: renderRowsFuncType;
}
/** A simple component that takes in data and renders it in a tabular view  */
declare const ListView: {
  (props: ListViewProps): JSX.Element;
  defaultProps: Partial<ListViewProps>;
};
export default ListView;
