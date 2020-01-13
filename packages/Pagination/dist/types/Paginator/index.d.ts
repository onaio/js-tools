/** generic interface describing arbitrary object schema */
export interface FlexObject {
  [key: string]: any;
}
declare type CustomReducer<IState> = (
  state: PaginationState<IState>,
  action: InterActionType<IState>
) => FlexObject;
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
export declare type PaginationState<IState extends {}> = IState & DefaultPaginationState;
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
export declare enum paginationActionTypes {
  TO_PAGE = 'TO_PAGE'
}
/** describes an action to change the currentPage */
export interface SwitchCurrentPageAction {
  type: paginationActionTypes;
  currentPage: number;
}
/** a union of all action types */
declare type PageActionTypes = SwitchCurrentPageAction;
/** describe the action after having passed through our reducer */
export interface InterActionType<IState> extends PageActionTypes {
  changes: PaginationState<IState>;
}
/** default reducer */
export declare function paginationReducer<IState>(
  state: PaginationState<IState>,
  action: PageActionTypes
): PaginationState<IState>;
/** hook to expose page mutating helper logic to the calling component */
export declare function usePagination<IState>({
  totalRecords,
  pageSize,
  reducer,
  initialState
}: PaginationOptions<IState>): {
  canNextPage: boolean;
  canPreviousPage: boolean;
  firstPage: () => void;
  goToPage: (pageNumber: number) => void;
  lastPage: () => void;
  nextPage: () => void;
  paginationState: FlexObject;
  previousPage: () => void;
};
export {};
