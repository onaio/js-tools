/** Wraps basePagination with an interface that allows the basePagination
 * to work with the react-router.
 */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { BasePaginator, PaginationData } from './base';

/** interface for RoutedPagination props */
export interface RoutedPaginatorProps {
  ariaLabel?: string;
  endLabel: string;
  nextLabel: string;
  pageLimit: number;
  pageNeighbours: number;
  previousLabel: string;
  startLabel: string;
  totalRecords: number;
  urlKey: string;
}

/** default props for routedPagination component */
const defaultRoutedPaginatorProps: RoutedPaginatorProps = {
  ariaLabel: 'page navigation',
  endLabel: 'End',
  nextLabel: 'Next',
  pageLimit: 30,
  pageNeighbours: 2,
  previousLabel: 'Previous',
  startLabel: 'Start',
  totalRecords: 0,
  urlKey: 'page'
};
/** the pagination component ; Places constraint on how anyone implementing
 * this component formats their urls, specifically it requires one to have a nested
 * route with the key `tablePage`
 *
 * e.g
 *
 * SOME_PAGE_PATH = /records/:tablePage
 * SOME_PAGE_URL = /records/2
 *
 * where path is what is registered in a switch component and the url
 * is the url entry that goes into the history stack
 */
const Paginator = (
  props: RoutedPaginatorProps & RouteComponentProps<{ [key: string]: string }>
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { urlKey } = props;

  useEffect(() => {
    // get currentPage from route and set that as the currentPage
    currentPageFromRoute();
  }, []);

  // functions

  /** gets the current page from url, this assumes the urls are formatted
   * in a certain way.
   */
  const currentPageFromRoute = () => {
    const { match } = props;
    const pageFromUrl = match.params[urlKey];
    const redirectToPage: number = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
    setCurrentPage(redirectToPage);
  };

  const getRedirectUrl = (
    thisPage: number,
    path: string,
    params: { [key: string]: string | undefined }
  ) => {
    // create new url to redirect to
    let urlToRedirectTo = '';
    Object.entries(params).forEach(([k, v]) => {
      let val: number | string | undefined = v;
      if (k === urlKey) {
        val = thisPage;
      }
      urlToRedirectTo = path.replace(`/:${k}`, `/${val}`);
    });
    return urlToRedirectTo;
  };

  /** changeHandler that gets called when user clicks on paginationItem
   * This sets the currentPage for the base paginator component and passed data
   * up to the callback
   *
   * @param {PaginationData} paginationData - state of pagination component
   */
  const pageChangeHandler = (paginationData: PaginationData) => {
    // get clicked route; modify the url and redirect to that.
    const { path, params } = props.match;

    const urlToRedirectTo = getRedirectUrl(paginationData.currentPage, path, params);
    // now redirect programmatically to new url
    props.history.push(urlToRedirectTo);
  };

  const {
    ariaLabel,
    endLabel,
    nextLabel,
    pageLimit,
    pageNeighbours,
    previousLabel,
    startLabel,
    totalRecords
  } = props;

  /** const props for base paginator */
  const basePaginatorProps = {
    ariaLabel,
    currentPage,
    endLabel,
    nextLabel,
    pageChangeHandler,
    pageLimit,
    pageNeighbours,
    previousLabel,
    startLabel,
    totalRecords
  };

  return <BasePaginator {...basePaginatorProps} />;
};

Paginator.defaultProps = defaultRoutedPaginatorProps;

const RoutedPaginator = withRouter(Paginator);

export { RoutedPaginator };
