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
  headerItems: any;
  tableClass: any;
  tbodyClass: any;
  theaderClass: any;
}

/** ListView */
const ListView: React.ElementType = (props: ListViewProps) => {
  const { data, headerItems, tableClass, tbodyClass, theaderClass } = props;

  /** changeme */
  function renderHeaders(items: any[], thClass: any) {
    if (items) {
      return (
        <th className={thClass ? thClass : null}>
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
  function renderRows(rowData: React.ReactNode[][], tbClass: any) {
    const result = rowData.map((item, itemKey) => (
      <tr key={itemKey}>
        <ElementMap items={[item]} HTMLTag="td" />
      </tr>
    ));
    return <tbody className={tbClass ? tbClass : null}>{result}</tbody>;
  }

  const headers = renderHeaders(headerItems, theaderClass);
  const rows = renderRows(data, tbodyClass);

  return (
    <table className={tableClass ? tableClass : null}>
      {headers}
      {rows}
    </table>
  );
};

export default ListView;
