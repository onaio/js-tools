# DrillDownTable

DrillDownTable is a [higher order component](https://reactjs.org/docs/higher-order-components.html) that works with [React Table](https://github.com/tannerlinsley/react-table).

It supports everything that [React Table](https://github.com/tannerlinsley/react-table) supports. In this document, we shall only go over the additional features that are unique to DrillDownTable.

## Installation

```sh
yarn add @onaio/drill-down-table
```

## Displaying Hierarchical Data

DrillDownTable was made to let you easily display hierarchically structured data in nice tables that allow you to drill down through the hierarchical levels of the data.

### Data structure

We expect the hierarchical data to be structured as expected in the [adjacency list model](https://en.wikipedia.org/wiki/Adjacency_list). i.e. each record in the data will have a pointer to its parent, like so:

```sh
  id  | parent_id |      name
------+-----------+----------------
 3954 |           | Siavonga
 2939 |           | Chadiza
 2962 | 2939      | Sinalo
 2957 | 3954      | Mkumbuzi
 2946 | 2962      | SNL_1
 2958 | 2962      | SNL_2
 2956 | 2962      | SNL_3
 2959 | 2957      | MKU_1
 2951 | 2957      | MKU_2
 2950 | 2939      | Chanida Border
 2947 | 2939      | Chanjobwe
```

Of course in javascript this same data will be represented as a list of objects, something like:

```js
data = [
  {
    id: 1,
    name: 'District A',
    parent_id: null,
    spray_coverage: '80%',
    spray_effectiveness: '80%'
  },
  {
    id: 4,
    name: 'HFC 1',
    parent_id: 1,
    spray_coverage: '70%',
    spray_effectiveness: '90%'
  }
];
```

### WithHeaders

As you know, you absolutely need to define `columns` when working with React Table. DrillDownTable includes another higher order component that we call `WithHeaders` that allows you to optionally define your table without defining any columns. The columns will be derived from the structure of your data. Obviously for maximum control over your table you would want to define columns, but in case you do not do that, then DrillDownTable will still work.

### The props

When defining your DrillDownTable, we expect you to provide some additional props (as in apart from the props you would need for ReactTable on its own). These are:

#### identifierField

Which field in the data represents the unique identifier for a row of data? This is optional, but if you do not define it then the default is set to `id`.

#### parentIdentifierField

Which field in the data represents the unique identifier of the parent of a row of data? This is optional, but if you do not define it then the default is set to `parent_id`.

#### rootParentId

This defines the value of the `parentIdentifierField` on the highest hierarchy level of your data. This is commonly something like `null` or `''` or `0`.

Basically it defines the first hierarchical level that you want to show on your `DrillDownTable`.

This is also optional and defaults to `null`.

#### linkerField

When the table is rendered, you can click anywhere on a row to drill down to the next level of the hierarchy. However, you may want to display some kind of indication that it is possible to drill down on a row of data. The `linkerField` prop allows you to define which field should have this indicator. By default this is set to the `id` field.

#### CellComponent

This is a component responsible for rendering the cell in which the `linkerField` (above) is found. By default it just adds a caret to show if you can drill down on a row of data or not. However you can supply your own component that renders whatever else you may want - for example instead of a caret you may want to show a link. Have a look at [`DropDownCell`](src/helpers/DropDownCell.tsx) for an example of how this component might look at.

#### useDrillDownTrProps

By default `DrillDownTable` allows you to click on any row to drill-down to the next hierarchical level of data. This is achieved by having a [custom geTrProps](https://github.com/tannerlinsley/react-table/tree/v6#props) built into `DrillDownTable`. You can turn this off by setting `useDrillDownTrProps` to be `false`.

### Code examples

Simplest example:

```tsx
import 'react-table/react-table.css';
import DrillDownTable from '@onaio/drill-down-table/';

const props = {
  data
};
<DrillDownTable {...props} />;
```

Define `location` as the column where the drill-down caret will be displayed

```tsx
import 'react-table/react-table.css';
import DrillDownTable from '@onaio/drill-down-table/';

const props = {
  data,
  linkerField: 'location'
};
<DrillDownTable {...props} />;
```

Supply columns as a prop.

```tsx
import 'react-table/react-table.css';
import DrillDownTable from '@onaio/drill-down-table/';

const columns = [
  {
    Header: 'Name',
    accessor: 'location'
  },
  {
    Header: 'Spray Coverage',
    accessor: 'spray_coverage'
  }
];
const props = {
  columns,
  data,
  linkerField: 'location'
};
<DrillDownTable {...props} />;
```

Turn off clicking on a row to drill-down i.e. turn off the built-in custom `getTrProps`.

```tsx
import 'react-table/react-table.css';
import DrillDownTable from '@onaio/drill-down-table/';

const props = {
  data,
  linkerField: 'location',
  useDrillDownTrProps: false
};
<DrillDownTable {...props} />;
```
