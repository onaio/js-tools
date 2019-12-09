export interface PaginationOptions {
  totalRecords: number;
  pageSize: number;
  pageNeighbors: number;
}
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pagesToBeDisplayed: number[];
  pageSize: number;
  totalRecords: number;
}
export declare enum paginationActionTypes {
  TO_PAGE = 'TO_PAGE'
}
export interface SwitchCurrentPageAction {
  type: paginationActionTypes;
  currentPage: number;
  pagesToBeDisplayed: number[];
}
export declare function paginationReducer(
  state: PaginationState,
  action: SwitchCurrentPageAction
): PaginationState;
export declare const usePagination: (
  options: PaginationOptions
) => {
  canNextPage: boolean;
  canPreviousPage: boolean;
  firstPage: () => void;
  goToPage: (pageNumber: number) => void;
  lastPage: () => void;
  nextPage: () => void;
  paginationState: PaginationState;
  previousPage: () => void;
};
