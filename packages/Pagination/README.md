# Pagination

This package provides a number of Pagination components that you can use to split huge data sets into smaller data chunks

## usePagination Hook

this hook provides the essential logic needed in managing the state of any pagination use-case.

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
- **reducer:**(redux-styled reducer function)
  - optional
  - uses the [state reducer pattern](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks) allowing you take control of state updates
- **initialState:**(< generic >)
  - optional
  - any object passed as an initial state is spread over the default initial state before doing anything else.

#### Paginator Code example

Here is a [code sandbox](https://codesandbox.io/s/bootstrap-pagination-component-jxtbt) showing how this hook could be used to create a bootstrap-powered pagination component

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

**PS**: One can override the above exposed variables via the initial state or using their own custom reducer. due to this dynamic nature the pagination state is not guaranteed to always be as shown above.
