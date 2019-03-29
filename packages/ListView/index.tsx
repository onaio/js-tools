import ElementMap from '@onaio/element-map';
import React from 'react';

/** Docstring goes here */
interface ListViewProps {
  data: string[][];
  headerItems: string[];
}

/** ListView */
const ListView: React.ElementType = (props: ListViewProps) => {
  const { data, headerItems } = props;

  function renderHeaders(items: string[]) {
    return (
      <tr>
        <ElementMap items={items} HTMLTag="th" />
      </tr>
    );
  }

  function renderRows(rowData: string[][]) {
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
