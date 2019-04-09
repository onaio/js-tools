import ElementMap from '@onaio/element-map';
import React from 'react';

/**
 * TODO
 * 1. custom class names for table, tbody, and thead
 * 2. entire thead as optional
 * 3. Future PR: custom renderHeaders and renderRows supplied as props
 */

/** Docstring goes here */
export interface ListViewProps {
  data: React.ReactNode[][];
  headerItems?: React.ReactNode[];
  tableClass?: string;
  tbodyClass?: string;
  theaderClass?: string;
}

/** ListView */
const ListView: React.ElementType = (props: ListViewProps) => {
  const { data, headerItems, tableClass, tbodyClass, theaderClass } = props;

  /** changeme */
  function renderHeaders(items?: React.ReactNode[], thClass?: string) {
    if (items) {
      return (
        <th className={thClass}>
          <tr>
            <ElementMap items={items} HTMLTag="th" />
          </tr>
        </th>
      );
    } else {
      return null;
    }
  }

  /** changeme */
  function renderRows(rowData: React.ReactNode[][], tbClass?: string) {
    const result = rowData.map((item, itemKey) => (
      <tr key={itemKey}>
        <ElementMap items={[item]} HTMLTag="td" />
      </tr>
    ));
    return <tbody className={tbClass}> {result} </tbody>;
  }

  const headers = renderHeaders(headerItems, theaderClass);
  const rows = renderRows(data, tbodyClass);

  return (
    <table className={tableClass}>
      {headers}
      {rows}
    </table>
  );
};

ListView.defaultProps = {
  tableClass: 'listview',
  tbodyClass: 'listview-tbody',
  theaderClass: 'listview-thead'
};

export default ListView;
