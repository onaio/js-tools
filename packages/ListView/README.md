# ListView

Simple component for listing items in a table.

## How it works

By providing data items and the relevant css classes it renders a list view in a table.

## Installation & Usage

### Examples

```tsx
import ListView from '@onaio/listview';

const props = {
  data: [['Ed', 6, 'Taller'], ['Edd', 12, 'Tallest'], ['Eddie', 17, 'Tall']],
  headerItems: ['Name', 'Age', 'Height'],
  tableClass: 'table-striped',
  tbodyClass: 'table-active',
  theadClass: 'thead-dark'
};
<ListView {...props} />;
// output should now look like:
/** [<table
    className="table-striped"
  >
    <thead
      className="thead-dark"
    >
      <tr>
        <ElementMap
          HTMLTag="th"
          className="element-map"
          items={
            Array [
              "Name",
              "Age",
              "Height",
            ]
          }
        >
          <th
            className="element-map"
            key="0"
          >
            Name
          </th>
          <th
            className="element-map"
            key="1"
          >
            Age
          </th>
          <th
            className="element-map"
            key="2"
          >
            Height
          </th>
        </ElementMap>
      </tr>
    </thead>
    <tbody
      className="table-active"
    >
      <tr
        key="0"
      >
        <ElementMap
          HTMLTag="td"
          className="element-map"
          items={
            Array [
              "Ed",
              6,
              "Taller",
            ]
          }
        >
          <td
            className="element-map"
            key="0"
          >
            Ed
          </td>
          <td
            className="element-map"
            key="1"
          >
            6
          </td>
          <td
            className="element-map"
            key="2"
          >
            Taller
          </td>
        </ElementMap>
      </tr>
      <tr
        key="1"
      >
        <ElementMap
          HTMLTag="td"
          className="element-map"
          items={
            Array [
              "Edd",
              12,
              "Tallest",
            ]
          }
        >
          <td
            className="element-map"
            key="0"
          >
            Edd
          </td>
          <td
            className="element-map"
            key="1"
          >
            12
          </td>
          <td
            className="element-map"
            key="2"
          >
            Tallest
          </td>
        </ElementMap>
      </tr>
      <tr
        key="2"
      >
        <ElementMap
          HTMLTag="td"
          className="element-map"
          items={
            Array [
              "Eddie",
              17,
              "Tall",
            ]
          }
        >
          <td
            className="element-map"
            key="0"
          >
            Eddie
          </td>
          <td
            className="element-map"
            key="1"
          >
            17
          </td>
          <td
            className="element-map"
            key="2"
          >
            Tall
          </td>
        </ElementMap>
      </tr>
    </tbody>
  </table>]  *\
```

## Props

The ListView component takes this props:
data, headerItems, tableClass, tbodyClass, theadClass, renderHeaders, renderRows
#props with sample values

```tsx
const props = {
  data: [['Ed', 6, 'Taller'], ['Edd', 12, 'Tallest'], ['Eddie', 17, 'Tall']],
  headerItems: ['Name', 'Age', 'Height'],
  tableClass: 'table-striped',
  tbodyClass: 'table-active',
  theadClass: 'thead-dark',
  renderHeaders: (items, cssClass) => (
    <thead className={cssClass}>
      <tr>
        <th colSpan={2}>Top Header</th>
      </tr>
      <tr>
        <ElementMap items={items} HTMLTag="th" />
      </tr>
    </thead>
  ),
  renderRows: (rowData, cssClass) => {
    const rows = rowData.map((items, itemKey) => (
      <tr key={itemKey}>
        <ElementMap items={items} HTMLTag="td" />
      </tr>
    ));
    return <tbody className={cssClass}>{rows}</tbody>;
  }
};
```
