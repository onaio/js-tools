/** headless component for pagination */
import { useReducer } from 'react';
import { fetchPageNumbers, sanitizeNumber } from './utils';

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

export enum paginationActionTypes {
  TO_PAGE = 'TO_PAGE'
}

export interface SwitchCurrentPageAction {
  type: paginationActionTypes;
  currentPage: number;
  pagesToBeDisplayed: number[];
}

export function paginationReducer(state: PaginationState, action: SwitchCurrentPageAction) {
  switch (action.type) {
    case paginationActionTypes.TO_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
        pagesToBeDisplayed: action.pagesToBeDisplayed
      };
    default:
      return state;
  }
}

export const usePagination = (options: PaginationOptions) => {
  const { totalRecords, pageSize, pageNeighbors } = options;
  const totalPages = Math.ceil(totalRecords / pageSize);

  // pageNeighbors can be in [2, 3, 4, 5]
  const neighborPillsNum = Math.max(2, Math.min(pageNeighbors, 5));

  const defaultPaginationState: PaginationState = {
    currentPage: 1,
    pageSize,
    pagesToBeDisplayed: fetchPageNumbers(neighborPillsNum, totalPages, 0),
    totalPages,
    totalRecords
  };

  const [state, dispatch] = useReducer(paginationReducer, defaultPaginationState);

  const nextPage = () =>
    dispatch(changePageCreator(state.currentPage + 1, totalPages, pageNeighbors));
  const firstPage = () => dispatch(changePageCreator(1, totalPages, pageNeighbors));
  const lastPage = () => dispatch(changePageCreator(totalPages, totalPages, pageNeighbors));
  const previousPage = () =>
    dispatch(changePageCreator(state.currentPage - 1, totalPages, pageNeighbors));
  const goToPage = (pageNumber: number) =>
    dispatch(changePageCreator(pageNumber, totalPages, pageNeighbors));

  const canPreviousPage = state.currentPage > 1;
  const canNextPage = state.currentPage < totalPages;

  return {
    canNextPage,
    canPreviousPage,
    firstPage,
    goToPage,
    lastPage,
    nextPage,
    paginationState: state,
    previousPage
  };
};

const changePageCreator = (
  page: number,
  totalPages: number,
  pageNeighbors: number
): SwitchCurrentPageAction => {
  const thisPage = sanitizeNumber(page, totalPages);
  return {
    currentPage: thisPage,
    pagesToBeDisplayed: fetchPageNumbers(pageNeighbors, totalPages, thisPage),
    type: paginationActionTypes.TO_PAGE
  };
};
