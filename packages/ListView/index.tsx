import ElementMap from '@onaio/element-map';
import React from 'react';

/** Type definition for renderHeaderFunc */
export type renderHeadersFuncType = (items?: React.ReactNode[], thClass?: string) => Element | null;
/** Type definition for renderRowsFunc */
export type renderRowsFuncType = (rowData: React.ReactNode[][], tbClass?: string) => Element;

/** Renders header section of a table */
export function renderHeadersFunc(items?: React.ReactNode[], thClass?: string) {
  if (items) {
    return (
      <thead className={thClass}>
        <tr>
          <ElementMap items={items} HTMLTag="th" />
        </tr>
      </thead>
    );
  } else {
    return null;
  }
}

/** Renders table body section of the table */
export function renderRowsFunc(rowData: React.ReactNode[][], tbClass?: string) {
  const rows = rowData.map((items, itemKey) => (
    <tr key={itemKey}>
      <ElementMap items={items} HTMLTag="td" />
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
  theadClass?: string;
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
    tbodyClass,
    theadClass
  } = props;

  return (
    <table className={tableClass}>
      {renderHeaders && renderHeaders(headerItems, theadClass)}
      {renderRows && renderRows(data, tbodyClass)}
    </table>
  );
};

ListView.defaultProps = {
  renderHeaders: renderHeadersFunc,
  renderRows: renderRowsFunc,
  tableClass: 'listview',
  tbodyClass: 'listview-tbody',
  theadClass: 'listview-thead'
};

export default ListView;
