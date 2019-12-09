# Pagination

This package provides a number of Pagination components that you can use to split
huge data sets into smaller viewable data chunks that we shall refer to as pages.

## usePagination Hook

Introduced in React@16.8.0 this hook provides the essential logic needed in managing the state of any pagination use-case.

### Installation

```node
yarn add @onaio/pagination
```

#### Options

`UsePagination` makes use of the following props

- **totalRecords:**(number)
  - **required**
  - the total numnber of records to be paginated
- **pageSize:**(number)
  - **required**
  - the number of records in a single page
- **pageNeighbors:**(number)
  - optional
  - for bootstrap like pagination component, the number of pagination links to show on either side of the current page.

#### Paginator Code example

```typescript
import { usePaginator } from '@onaio/pagination';

const MyPaginationComponent = () => {
   const {
          paginationState,
          nextPage,
          firstPage,
          lastPage,
          goToPage,
          previousPage,
          canNextPage,
          canPreviousPage
        } = usePagination(options);
}

return <>{/** Return custom ui here*/}</>
}
```

#### Exposed API

1. paginationState: the pagination state:

- currentPage
- pageSize
- pagesToBeDisplayed
- totalPages
- totalRecords

2. nextPage: increments the currentPage counter by one
3. firstPage: goes to the first page
4. lastPage: goes to the last page
5. goToPage: takes to arbitrary page
6. previousPage: decrements the currentPage counter by one
7. canNextPage: can i go to the nextPage?, is there a nextPage?
8. canPreviousPage: can i go to the previousPage?, is there a previousPage?
