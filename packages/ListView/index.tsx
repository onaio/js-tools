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
  headerItems: React.ReactNode[];
}

/** ListView */
const ListView: React.ElementType = (props: ListViewProps) => {
  const { data, headerItems } = props;

  /** changeme */
  function renderHeaders(items: React.ReactNode[]) {
    return (
      <tr>
        <ElementMap items={items} HTMLTag="th" />
      </tr>
    );
  }

  /** changeme */
  function renderRows(rowData: React.ReactNode[][]) {
    const result = rowData.map((item, itemKey) => (
      <tr key={itemKey}>
        <ElementMap items={[item]} HTMLTag="td" />
      </tr>
    ));
    return <tbody>{result}</tbody>;
  }

  const headers = renderHeaders(headerItems);
  const rows = renderRows(data);

  return (
    <table>
      <thead>{headers}</thead>
      {rows}
    </table>
  );
};

export default ListView;
