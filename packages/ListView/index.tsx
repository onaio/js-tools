import ElementMap from '@onaio/element-map';
import React from 'react';

/** Interface to define props of ListView */
export type renderHeadersFuncType = (items?: React.ReactNode[], thClass?: string) => Element | null;

/** Renders table header items using ElementMap to map through data items */
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

/** Interface for ListView props */
export interface ListViewProps {
  data: React.ReactNode[][];
  headerItems?: React.ReactNode[];
  tableClass?: string;
  tbodyClass?: string;
  theadClass?: string;
  renderHeaders?: renderHeadersFuncType;
}

/** A simple component that takes in data and renders it in a tabular view.
 */
const ListView: React.ElementType = (props: ListViewProps) => {
  const { data, headerItems, renderHeaders, tableClass, tbodyClass, theadClass } = props;

  /** Renders table row items using ElementMap to map through data items */
  function renderRows(rowData: React.ReactNode[][], tbClass?: string) {
    const rows = rowData.map((items, itemKey) => (
      <tr key={itemKey}>
        <ElementMap items={items} HTMLTag="td" />
      </tr>
    ));
    return <tbody className={tbClass}>{rows}</tbody>;
  }

  const tableRows = renderRows(data, tbodyClass);

  return (
    <table className={tableClass}>
      {renderHeaders && renderHeaders(headerItems, theadClass)}
      {tableRows}
    </table>
  );
};

ListView.defaultProps = {
  renderHeaders: renderHeadersFunc,
  tableClass: 'listview',
  tbodyClass: 'listview-tbody',
  theadClass: 'listview-thead'
};

export default ListView;
