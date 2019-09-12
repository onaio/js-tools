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

```typescript
import { Paginator } from '@onaio/paginator';

<Paginator />;
```

### Customization(Props)

Customizable options for Paginator include:

| PropName              | type                          | description                                                                          |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `ariaLabel`(optional) | `string`                      | custom aria label to add to the pagination component                                 |
| `onPageChange`        | `(e: paginationData) => void` | function that is called when a link is clicked, see below for info on paginationData |
| `pageLimit`           | `number`                      | integer representing number of records to display per page                           |
| `pageNeighbours`      | `number`                      | integer representing number of links on either side of active link                   |
| `totalRecords`        | `number`                      | integer representing number of all records                                           |

#### PaginationData

This documents the structure of the data object that is given as the first and only argument given to the onPageChange callback handler

| Property       | type     | description                                                |
| -------------- | -------- | ---------------------------------------------------------- |
| `currentPage`  | `number` | Page number of the currently active link                   |
| `pageLimit`    | `number` | integer representing number of records to display per page |
| `totalPages`   | `number` | the total number of pages                                  |
| `totalRecords` | `number` | integer representing number of all records                 |

#### Code example

```javascript
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
