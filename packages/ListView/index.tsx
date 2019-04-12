import ElementMap from '@onaio/element-map';
import React from 'react';

/** Type definition for renderHeaderFunc */
export type renderHeadersFuncType = (
  items?: React.ReactNode[],
  theadClass?: string,
  thClass?: string,
  trClass?: string
) => Element | null;

/** Type definition for renderRowsFunc */

export type renderRowsFuncType = (
  rowData: React.ReactNode[][],
  tbClass?: string,
  tdClass?: string,
  trClass?: string
) => Element;

/** Renders header section of a table */
export function renderHeadersFunc(
  items?: React.ReactNode[],
  theadClass?: string,
  thClass?: string,
  trClass?: string
) {
  if (items) {
    return (
      <thead className={theadClass}>
        <tr className={trClass}>
          <ElementMap items={items} HTMLTag="th" className={thClass} />
        </tr>
      </thead>
    );
  } else {
    return null;
  }
}

/** Renders body section of the table */
export function renderRowsFunc(
  rowData: React.ReactNode[][],
  tbClass?: string,
  trClass?: string,
  tdClass?: string
) {
  const rows = rowData.map((items, itemKey) => (
    <tr key={itemKey} className={trClass}>
      <ElementMap items={items} HTMLTag="td" className={tdClass} />
    </tr>
  ));
  return <tbody className={tbClass}>{rows}</tbody>;
}

/** Interface to define props for ListView */
export interface ListViewProps {
  data: React.ReactNode[][];
  headerItems?: React.ReactNode[];
  tableClass?: string;
  tbodyClass?: string;
  tdClass?: string;
  theadClass?: string;
  thClass?: string;
  trClass?: string;
  renderHeaders?: renderHeadersFuncType;
  renderRows?: renderRowsFuncType;
}

/** A simple component that takes in data and renders it in a tabular view  */
const ListView: React.ElementType = (props: ListViewProps) => {
  const {
    data,
    headerItems,
    renderHeaders,
    renderRows,
    tableClass,
    tdClass,
    tbodyClass,
    theadClass,
    thClass,
    trClass
  } = props;

  return (
    <table className={tableClass}>
      {renderHeaders && renderHeaders(headerItems, theadClass, tdClass, trClass)}
      {renderRows && renderRows(data, tbodyClass, thClass, trClass)}
    </table>
  );
};

ListView.defaultProps = {
  renderHeaders: renderHeadersFunc,
  renderRows: renderRowsFunc,
  tableClass: 'listview',
  tbodyClass: 'listview-tbody',
  tdClass: 'listview-td',
  thClass: 'listview-th',
  theadClass: 'listview-thead',
  trClass: 'listview-primary'
};

export default ListView;
