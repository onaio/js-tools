import ElementMap from '@onaio/element-map';
import React from 'react';

/**
 * TODO
 * 1. Future PR: custom renderHeaders and renderRows supplied as props
 */

/** A simple component that takes in data and renders it in a tabular view.
 */

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

/** Docstring goes here */
export interface ListViewProps {
  data: React.ReactNode[][];
  headerItems?: React.ReactNode[];
  tableClass?: string;
  tbodyClass?: string;
  theaderClass?: string;
  renderHeaders?: renderHeadersFuncType;
}

/** Custom Re-usable Listview Component  */
const ListView: React.ElementType = (props: ListViewProps) => {
  /** Destructuring respective ListviewProps */
  const { data, headerItems, renderHeaders, tableClass, tbodyClass, theaderClass } = props;

  /** Renders table row items using ElementMap to map through data items */
  function renderRows(rowData: React.ReactNode[][], tbClass?: string) {
    const rows = rowData.map((item, itemKey) => (
      <tr key={itemKey}>
        <ElementMap items={[item]} HTMLTag="td" />
      </tr>
    ));
    return <tbody className={tbClass}>{rows}</tbody>;
  }

  const tableRows = renderRows(data, tbodyClass);

  return (
    <table className={tableClass}>
      {renderHeaders && renderHeaders(headerItems, theaderClass)}
      {tableRows}
    </table>
  );
};

ListView.defaultProps = {
  renderHeaders: renderHeadersFunc,
  tableClass: 'listview',
  tbodyClass: 'listview-tbody',
  theaderClass: 'listview-thead'
};

export default ListView;
