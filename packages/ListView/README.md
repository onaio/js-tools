# ListView

A simple re-usable `React` component that lists data items in a table.

## How it works

This component works by taking in data items, optional table classes as props and renders a table with the provided classes. The component allows one to overide the methods rendering the table headers and table rows by passing them as props to the component too.

## Installation & Usage

### Examples

```tsx
import ListView from '@onaio/listview';

const props = {
  data: [['Ed', 6, 'Taller'], ['Edd', 12, 'Tallest'], ['Eddie', 17, 'Tall']],
  headerItems: ['Name', 'Age', 'Height'],
  tableClass: 'table-striped',
  tbodyClass: 'table-active',
  tdClass: 'td-primary',
  theadClass: 'thead-dark',
  thClass: 'th-primary',
  trClass: 'tr-warning'
};
<ListView {...props} />;

//output should now look like:

<table class="table-striped">
  <thead class="thead-dark">
    <tr class="tr-warning">
      <th className="th-primary" key="0">
        {' '}
        Name{' '}
      </th>
      <th className="th-primary" key="1">
        {' '}
        Age{' '}
      </th>
      <th className="th-primary" key="2">
        {' '}
        Height{' '}
      </th>
    </tr>
  </thead>
  <tbody className="table-active">
    <tr class="tr-warning" key="0">
      <td className="td-primary" key="0">
        {' '}
        Ed{' '}
      </td>
      <td className="td-primary" key="1">
        {' '}
        6{' '}
      </td>
      <td className="td-primary" key="2">
        {' '}
        Taller{' '}
      </td>
    </tr>
    <tr class="tr-warning" key="1">
      <td className="td-primary" key="0">
        {' '}
        Edd{' '}
      </td>
      <td className="td-primary" key="1">
        {' '}
        12{' '}
      </td>
      <td className="td-primary" key="2">
        {' '}
        Tallest{' '}
      </td>
    </tr>
    <tr class="tr-warning" key="2">
      <td className="td-primary" key="0">
        {' '}
        Eddie{' '}
      </td>
      <td className="td-primary" key="1">
        {' '}
        17{' '}
      </td>
      <td className="td-primary" key="2">
        {' '}
        Tall{' '}
      </td>
    </tr>
  </tbody>
</table>;
```

## Props

The ListView component takes these props:

**data** - prop that holds data items that will be rendered on the table e.g. `[['Ed', 6, 'Taller'], ['Edd', 12, 'Tallest'], ['Eddie', 17, 'Tall']]`

**headerItems** - prop that holds header items of the table an example would be `['Name', 'Age', 'Height']`

**tableClass** - prop that holds table element class e.g `table-striped`

**tbodyClass** - prop that holds table body element class e.g. `table-active`

**tdClass** - prop that holds table data element class e.g. `td-primary`

**theadClass** - prop that holds table head element class e.g. `thead-dark`

**thClass** - prop that holds table header element class e.g. `th-primary`

**trClass** - prop that holds table header element class e.g. `tr-warning`

**renderHeaders** - This prop is a method that takes header data items and classes to render the header section of our table. The method can be passed as a prop into the component to overide the existing method. The current implementation uses `ElementMap` component to loop through the data items adding them inside th elements.
e.g.

```renderHeaders: (items, cssClass) => (
      <thead className={cssClass}>
        <tr>
          <th colSpan={2}>Top Header</th>
        </tr>
        <tr>
          <ElementMap items={items} HTMLTag="th" />
        </tr>
      </thead>
    )
```

**renderRows** - Very simmillar to renderHeaders prop this is a method that renders the table body. The method takes row data items and css classes as parameters, `ElementMap` component is also used in this method to loop through the data items adding them inside td elements.

## props with sample values

```tsx
const props = {
  data: [['Ed', 6, 'Taller'], ['Edd', 12, 'Tallest'], ['Eddie', 17, 'Tall']],
  headerItems: ['Name', 'Age', 'Height'],
  tableClass: 'table-striped',
  tbodyClass: 'table-active',
  tdClass: 'td-primary',
  theadClass: 'thead-dark',
  thClass: 'th-primary',
  trClass: 'tr-warning',

  renderHeaders: (items, theadClass, thClass, trClass) => {
   return (
     <thead className={theadClass}>
      <tr className={trClass}>
        <ElementMap items={items} HTMLTag="th" className={thClass} />
      </tr>
    </thead>);
  }
  renderRows: (rowData, tbodyClass, tdClass, trClass) => {
    const rows = rowData.map((items, itemKey) => (
      <tr key={itemKey} className={trClass}>
        <ElementMap items={items} HTMLTag="td" className={tdClass} />
      </tr>
    ));
    return <tbody className={tbodyClass}>{rows}</tbody>;
  }
};
```
