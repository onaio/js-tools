import ElementMap from '@onaio/element-map';
import React from 'react';

/**
 * TODO
 * 1. Future PR: custom renderHeaders and renderRows supplied as props
 */

/** Custom Re-uasble Listview Component  */

export interface ListViewProps {
  data: React.ReactNode[][];
  headerItems?: React.ReactNode[];
  tableClass?: string;
  tbodyClass?: string;
  theaderClass?: string;
}

const ListView: React.ElementType = (props: ListViewProps) => {
  const { data, headerItems, tableClass, tbodyClass, theaderClass } = props;

  function renderHeaders(items?: React.ReactNode[], thClass?: string) {
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

  function renderRows(rowData: React.ReactNode[][], tbClass?: string) {
    const rows = rowData.map((item, itemKey) => (
      <tr key={itemKey}>
        <ElementMap items={[item]} HTMLTag="td" />
      </tr>
    ));
    return <tbody className={tbClass}>{rows}</tbody>;
  }

  const tableHeaders = renderHeaders(headerItems, theaderClass);
  const tableRows = renderRows(data, tbodyClass);

  return (
    <table className={tableClass}>
      {tableHeaders}
      {tableRows}
    </table>
  );
};

ListView.defaultProps = {
  tableClass: 'listview',
  tbodyClass: 'listview-tbody',
  theaderClass: 'listview-thead'
};

export default ListView;
