# DrillDownTable

DrillDownTable is a bootstrap-based [higher order component](https://reactjs.org/docs/higher-order-components.html) that works with [React Table](https://github.com/tannerlinsley/react-table).

It makes use of the following hooks from react-table:

- useSortBy
- usePagination

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

As you know, you absolutely need to define `columns` when working with React Table. DrillDownTable includes a `columnsFromObject` util that can be used to create columns from your objects

### The props

These are:

#### columns && data

**Required**
these 2 props should be structured as defined by react-table.

#### identifierField

**Optional**(`string` = `id`)

Which field in the data represents the unique identifier for a row of data? This is optional, but if you do not define it then the default is set to `id`.

#### parentIdentifierField

**Optional**(`string` = `parent_id`)

Which field in the data represents the unique identifier of the parent of a row of data? This is optional, but if you do not define it then the default is set to `parent_id`.

#### rootParentId

This defines the value of the `parentIdentifierField` on the highest hierarchy level of your data. This is commonly something like `null` or `''` or `0`.

Basically it defines the first hierarchical level that you want to show on your `DrillDownTable`.

This is also optional and defaults to `null`.

#### linkerField

**Optional**(`string` | `undefined` = `undefined`)

When the table is rendered, you can click anywhere on a row to drill down to the next level of the hierarchy. However, you may want to display some kind of indication that it is possible to drill down on a row of data. The `linkerField` prop allows you to define which field should have this indicator. By default this is set to the `id` field.

#### CellComponent

This is a component responsible for rendering the cell in which the `linkerField` (above) is found. By default it just adds a caret to show if you can drill down on a row of data or not. However you can supply your own component that renders whatever else you may want - for example instead of a caret you may want to show a link. Have a look at [`DropDownCell`](src/helpers/DropDownCell.tsx) for an example of how this component might look at.

#### extraCellProps

This is an object that represents extra props to be given to the `CellComponent` (above).

#### useDrillDown

**Optional**(`boolean` = `true`)

By default `DrillDownTable` allows you to click on any row to drill-down to the next hierarchical level of data. This is achieved by adding a custom onClick handler to the cells that render the linker field. To switch this off and have the table render as a normal table, set `useDrillDown` to `false`.

#### renderInTopFilterBar

**Optional**(`(prop) => ReactNode` | `undefined` = `undefined`)

add a section immediately above table for filter components, through a render prop

#### renderInBottomFilterBar

**Optional**(`(prop) => ReactNode` | `undefined` = `undefined`)

add a section immediately below table for filter components, through a render prop

#### nullDataComponent

**Optional**(`React.ElementType` = `<default component>`)

A custom component to be rendered when data is an empty array.

#### loading

**Optional**(`boolean` = `false`)

A boolean switch that makes the table render a custom

#### loadingComponent

**Optional**(`React.ElementType` = `<default component>`)

A custom component that should be rendered when loading is true.

#### getTdProps

**optional**(`(cell: Cell) => Dictionary` | `undefined` = `undefined`)

Use this to pass in a custom prop getter for the table cell elements.

While the default for this is undefined, the table component does make use of a customTdProps getter that attaches a onClick handler that effects drilling down, This handler is only used when `useDrillDown = true` and `getTdProps` is undefined, otherwise if `getTdProps` is propped in then the component uses that as the click handler

#### paginate

**optional**(`boolean` = `true`)

Tells the component if should paginate the data. setting this to false will have the component show all of its data as a single page.

#### resize

**optional**(`boolean` = `true`)

Make table columns resizeable.

#### hasChildren

**Optional**

This is a function that returns a `boolean` indicating whether or not a row of data has children i.e. should you be able to drill down using the given row?

A sample `hasChildren` function looks like so:

```ts
export function hasChildrenFunc<D extends object>(
  cellObject: Cell<D>,
  parentIdList: Array<number | string>,
  idField: string | number = ID
) {
  return parentIdList.includes(cellObject.row.original[idField]);
}
```

### Code examples

Simplest example:

```tsx
import { DrillDownTable, columnsFromObjects } from '@onaio/drill-down-table/';

const props = {
  columns: columnsFromObjects(data),
  data
};
<DrillDownTable {...props} />;
```

Define `location` as the column where the drill-down caret will be displayed

```tsx
import { DrillDownTable, columnsFromObjects } from '@onaio/drill-down-table/';

const props = {
  columns: columnsFromObjects(data),
  data,
  linkerField: 'location'
};
<DrillDownTable {...props} />;
```

Supply columns as a prop.

```tsx
import { DrillDownTable } from '@onaio/drill-down-table/';

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

Turn off clicking on a row to drill-down i.e. .

```tsx
import { DrillDownTable, columnsFromObjects } from '@onaio/drill-down-table/';

const props = {
  columns: columnsFromObjects(data),
  data,
  linkerField: 'location',
  useDrillDown: false
};
<DrillDownTable {...props} />;
```

Use a custom `CellComponent` and `extraCellProps`.

```tsx
interface NewCellComponentProps extends DropDownCellProps {
  urlPath: string;
  caret: string;
}

const NewCellComponent: React.ElementType = (props: NewCellComponentProps) => {
  const { cellValue, hasChildren, urlPath, caret } = props;
  return (
    <div>
      <span>
        {hasChildren ? (
          <a href={urlPath}>
            {cellValue} {caret}
          </a>
        ) : (
          cellValue
        )}
      </span>
    </div>
  );
};

const props = {
  columns: columnsFromObjects(data),
  CellComponent: NewCellComponent,
  data,
  extraCellProps: { urlPath: 'http://example.com', caret: <span>&#43;</span> }
};
<DrillDownTable {...props} />;
```

Use custom `hasChildren`

```tsx
import { DrillDownTable, columnsFromObjects } from '@onaio/drill-down-table/';

const props = {
  columns: columnsFromObjects(data),
  data: data,
  hasChildren: (item, parents, idfield) => item.original[idfield] === 10
};
<DrillDownTable {...props} />;
```

Adding global filter components like pagination

```tsx

// write the pagination component
const CustomPagination = (props) => {
    return <>{/** pagination JSX */}</>
}

// create a render prop that takes the [TableInstance properties](https://github.com/tannerlinsley/react-table/blob/master/docs/api/useTable.md#instance-properties) adds custom properties and passes them to the CustomPagination component
const customRenderInFilterBar = <T extends object>(tableProps: RenderFiltersInBarOptions<T>) => {
    return (
      <div className="row">
        <div className="col">{customRenderPagination(tableProps)}</div>
      </div>
    );
  };
  let props: Dictionary = {
    columns: columnsFromObjects(jurisdictions),
    data: jurisdictions,
    useDrillDown: true,
    renderInTopFilterBar: customRenderInFilterBar,
    linkerField: 'name',
    rootParentId: '',
    renderInBottomFilterBar: customRenderInFilterBar
  };

<DrillDownTable {...props} />
  );
```
