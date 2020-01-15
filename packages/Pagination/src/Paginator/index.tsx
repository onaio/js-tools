/** headless component for pagination */
import { useReducer } from 'react';
import { sanitizeNumber } from './utils';

type CustomReducer<IState, CustomActionTypes = {}> = (
  state: PaginationState<IState>,
  action: ActionTypes<IState, CustomActionTypes>
) => PaginationState<IState>;

/** describes options passed to the hook */
export interface PaginationOptions<IState> {
  totalRecords: number;
  pageSize: number;
  reducer?: CustomReducer<IState>;
  initialState?: IState;
}

/** describes a generic paginationState that can be extended with
 * other properties
 */
export type PaginationState<IState extends {}> = IState & DefaultPaginationState;

/** describes default state exposed to the using component
 * This can be modified by a custom reducer if one is given
 */
interface DefaultPaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
}

/** types for actions */
export enum paginationActionTypes {
  TO_PAGE = 'TO_PAGE'
}

/** describes an action to change the currentPage */
export interface SwitchCurrentPageAction {
  type: paginationActionTypes;
  currentPage: number;
}

/** a union of all action types */
type PageActionTypes = SwitchCurrentPageAction;

/** describe the action after having passed through our reducer, you can use
 * this as a type for custom actions that you wish to pass through your custom
 * reducer
 */
export type ActionTypes<IState, CustomActionTypes = {}> =
  | PageActionTypes & {
      changes: PaginationState<IState>;
    }
  | CustomActionTypes;

/** default reducer */
export function paginationReducer<IState>(state: PaginationState<IState>, action: PageActionTypes) {
  switch (action.type) {
    case paginationActionTypes.TO_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    default:
      return state;
  }
}

/** combines the passed in custom reducer with the default reducer
 * such that we apply changes defined by our reducer first and then
 * pass on the newState and the action+newState to the custom reducer
 *
 * @param {CustomReducer<IState>} reducer - their reducer
 */
function reducerCombiner<IState>(reducer: CustomReducer<IState>) {
  return (state: any, action: any) => {
    const newState = paginationReducer(state, action);
    const response = reducer(newState, { ...action, changes: newState });
    return response;
  };
}

/** hook to expose page mutating helper logic to the calling component */
export function usePagination<IState>({
  totalRecords = 0,
  pageSize = 1,
  reducer = (s: PaginationState<IState>, a: ActionTypes<IState>) => s,
  initialState
}: PaginationOptions<IState>) {
  const totalPages = Math.ceil(totalRecords / pageSize); // division by zero error

  const PassedInState = initialState ? initialState : {};

  const defaultPaginationState: any = {
    currentPage: 1,
    pageSize,
    totalPages,
    totalRecords,
    ...PassedInState
  };

  const combinedReducer = reducerCombiner(reducer);
  const [paginationState, dispatch] = useReducer(combinedReducer, defaultPaginationState);

  const nextPage = () => dispatch(changePageCreator(paginationState.currentPage + 1, totalPages));
  const firstPage = () => dispatch(changePageCreator(1, totalPages));
  const lastPage = () => dispatch(changePageCreator(totalPages, totalPages));
  const previousPage = () =>
    dispatch(changePageCreator(paginationState.currentPage - 1, totalPages));
  const goToPage = (pageNumber: number) => dispatch(changePageCreator(pageNumber, totalPages));

  const canPreviousPage = paginationState.currentPage > 1;
  const canNextPage = paginationState.currentPage < totalPages;

  return {
    canNextPage,
    canPreviousPage,
    dispatch,
    firstPage,
    goToPage,
    lastPage,
    nextPage,
    paginationState,
    previousPage
  };
}

/** action creator : page change actions */
const changePageCreator = (page: number, totalPages: number): PageActionTypes => {
  const thisPage = sanitizeNumber(page, totalPages);
  return {
    currentPage: thisPage,
    type: paginationActionTypes.TO_PAGE
  };
};
