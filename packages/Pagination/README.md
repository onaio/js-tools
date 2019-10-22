# Pagination

This package provides a number of Pagination components that you can use to split
huge data sets into smaller viewable data chunks that we shall refer to as pages.

## Paginator

An opinionated bootstrap powered pagination component

### Installation

```node
yarn add @onaio/pagination
```

Also since the component relies on bootstrap, add this `import 'bootstrap/dist/css/bootstrap.min.css';` to your `< entry-file-name >.{jsx|tsx|js|ts}` file

### Usage

This component comes in 2 flavours:

1. Paginator - uses click Handlers to pass data(`PaginationData`) back to calling component
2. RoutedPaginator - integrates with react-router; uses the current url to know which page of the paginated data to show, clicking a paginationItem changes the current url

_They share the below props_:

#### Customization(Props)

Customizable options for both Paginator & routedPaginator include:

| PropName              | type     | description                                                        | type                |
| --------------------- | -------- | ------------------------------------------------------------------ | ------------------- |
| `ariaLabel`(optional) | `string` | custom aria label to add to the pagination component               | `"page Navigation"` |
| `endLabel`            | `string` | label for pagination item linking to last page                     | `"End"`             |
| `nextLabel`           | `string` | label for pagination item linking to the next page                 | `"Next"`            |
| `pageLimit`           | `number` | integer representing number of records to display per page         | `30`                |
| `pageNeighbours`      | `number` | integer representing number of links on either side of active link | `2`                 |
| `previousLabel`       | `string` | label for pagination item linking to the previous page             | `Previous`          |
| `startLabel`          | `string` | label for pagination item linking to the first page                | `Start`             |
| `totalRecords`        | `number` | integer representing number of all records                         | `0`                 |

#### **Paginator Component**

```typescript
import { Paginator } from '@onaio/pagination';

<Paginator />;
```

##### _props for Paginator_

Further customizable options for Paginator include:

| PropName       | type                          | description                                                                          |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `onPageChange` | `(e: paginationData) => void` | function that is called when a link is clicked, see below for info on paginationData |

**PaginationData**:

PaginationData describes the interface for data that the onPageChange handler is called with as an argument.

| Property       | type     | description                                                |
| -------------- | -------- | ---------------------------------------------------------- |
| `currentPage`  | `number` | Page number of the currently active link                   |
| `pageLimit`    | `number` | integer representing number of records to display per page |
| `totalPages`   | `number` | the total number of pages                                  |
| `totalRecords` | `number` | integer representing number of all records                 |

#### Paginator Code example

```typescript
import { Paginator, PaginatorProps } from '@onaio/pagination';

const props: PaginatorProps = {
  ariaLabel: 'pagination sample',
  onPageChange: data => alert(`clicked page no ${data.currentPage}`),
  pageLimit: 35,
  pageNeighbours: 3,
  totalRecords: 589
};

<Paginator {...props} />;
```

#### **RoutedPaginator Component**

```typescript
import { RoutedPaginator } from '@onaio/pagination';

<RoutedPaginator />;
```

##### _props for RoutedPaginator_

Further customizable options for RoutedPaginator include:

| PropName | type     | description                                                      | default  |
| -------- | -------- | ---------------------------------------------------------------- | -------- |
| `urlKey` | `string` | the key in the path that will hold the value of the current page | `"page"` |

**urlKey example** :

for each route that will render a page with the `RoutedPaginator` component, you need to add a nested route with a dynamic key from which the `RoutedPaginator` will derive the currentPage, here is an example.

Assuming we have a records page that will render a table whose data we wish to paginate.

a starting basic path and url might look this

`RECORDS_PAGE_PATH` = `/records`

`RECORDS_PAGE_URL` = `/records`

where react-router matches the url against the path so as to know what to render.

The nest step would be to refactor our path to look like this

`RECORDS_PAGE_PATH` = `/records/:tablePage`

making it possible to have a positive match for this url

`RECORDS_PAGE_URL` = `/records/2`

The intention here being that we want the records page table to render the second page of whatever data it needs to show.

To support such a use-case, we would pass the string `'tablePage'` as the value of `urlKey` so that the `RoutedPaginator` knows from what part of the url to pick the current page from and what part of the url to change once a user redirects to another page by clicking on one of the paginator's links.

#### RoutedPaginator Code example

```typescript
import { RoutedPaginator, PaginatorProps } from '@onaio/pagination';

const props: PaginatorProps = {
  ariaLabel: 'pagination sample',
  pageLimit: 35,
  pageNeighbours: 3,
  totalRecords: 589
};

<RoutedPaginator {...props} />;
```
