import { isAuthenticated } from '@onaio/session-reducer';
import queryString from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Store } from 'redux';

/** interface for PrivateRoute props */
interface PrivateRouteProps extends RouteProps {
  authenticated: boolean /** is the current user authenticated */;
  disableLoginProtection: boolean /** should we disable login protection */;
  redirectPath: string /** redirect to this path is use if not authenticated */;
}

/** declare default props for PrivateRoute */
const defaultPrivateRouteProps: Partial<PrivateRouteProps> = {
  authenticated: false,
  disableLoginProtection: false,
  redirectPath: '/login'
};

/** The PrivateRoute component
 * This component is a simple wrapper around Route and takes all its props in
 * addition to:
 *  1. {bool} authenticated
 *  2. {string} redirectPath
 *
 * If authenticated === true then render the component supplied
 * Otherwise redirect to the redirectPath
 */
const PrivateRoute = (props: PrivateRouteProps) => {
  const {
    component: Component,
    authenticated,
    disableLoginProtection,
    redirectPath,
    location,
    ...theOtherProps
  } = props;

  /** recreates the url : the path; query string if any; a hash tag if any */
  const currentPath = `${(location && location.pathname) || ''}${(location && location.search) ||
    ''}${(location && location.hash) || ''}`;
  // we can now create the full redirect path, append next searchParma
  let fullRedirectPath = redirectPath;
  // is currentPath a non-empty string
  if (typeof currentPath !== 'undefined' && currentPath.length > 0) {
    fullRedirectPath = `${redirectPath}?${queryString.stringify({ next: currentPath })}`;
  }
  return (
    /* tslint:disable jsx-no-lambda */
    <Route
      {...theOtherProps}
      render={routeProps =>
        (authenticated === true || disableLoginProtection === true) && Component ? (
          <Component {...routeProps} {...theOtherProps} />
        ) : (
          <Redirect to={fullRedirectPath} />
        )
      }
    />
    /* tslint:enable jsx-no-lambda */
  );
};

PrivateRoute.defaultProps = defaultPrivateRouteProps;

export { PrivateRoute }; // export the un-connected component

/** Connect the component to the store */

/** interface to describe props from mapStateToProps */
interface DispatchedStateProps extends RouteProps {
  authenticated: boolean;
}

/** map state to props */
const mapStateToProps = (
  state: Partial<Store>,
  ownProps: Partial<PrivateRouteProps>
): DispatchedStateProps => {
  const result = {
    authenticated: isAuthenticated(state)
  };
  Object.assign(result, ownProps);
  return result;
};

/** create connected component */

/** The ConnectedPrivateRoute component
 * This component is a simple wrapper around Route and takes all its props in
 * addition to:
 *  1. {bool} authenticated - this comes from the Redux store
 *  2. {string} redirectPath
 *
 * If authenticated === true then render the component supplied
 * Otherwise redirect to the redirectPath
 */
const ConnectedPrivateRoute = connect<DispatchedStateProps, null, any>(
  mapStateToProps,
  null
)(PrivateRoute);

export default ConnectedPrivateRoute;
