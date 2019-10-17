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

1. Paginator - uses the click Handler that's called Paginator
2. routedPaginator - integrates and uses the current url to know what page data to show

They share the below props

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

This documents the structure of the data object that is given as the first and only argument given to the onPageChange callback handler

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

##### _Caveats_

While `RoutedPaginator` might not take further props other than the ones listed above, there are a few setup
details that are required for it to work correctly.

1. for each route that will render a page with the `RoutedPaginator` component, you need to add a nested route with the key `tablePage` e.g

   `SOME_PAGE_PATH` = `/records/:tablePage`

   `SOME_PAGE_URL` = `/records/2`

navigating to `SOME_PAGE_URL` would result in the routed component looking as below

clicking on any other paginationItem creates a new url and redirects to it

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
