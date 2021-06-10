/// <reference types="react" />
import { RouteProps } from 'react-router-dom';
/** interface for PrivateRoute props */
interface PrivateRouteProps extends RouteProps {
  authenticated: boolean /** is the current user authenticated */;
  disableLoginProtection: boolean /** should we disable login protection */;
  redirectPath: string /** redirect to this path is use if not authenticated */;
  routerDisabledRedirectPath: string /** redirect to this path if router is not enabled */;
  routerEnabled: boolean /** is this route enabled */;
}
/** The PrivateRoute component
 * This component is a simple wrapper around Route and takes all its props in
 * addition to:
 *  1. {bool} authenticated
 *  2. {string} redirectPath
 *
 * If authenticated === true then render the component supplied
 * Otherwise redirect to the redirectPath
 */
declare const PrivateRoute: {
  (props: PrivateRouteProps): JSX.Element;
  defaultProps: Partial<PrivateRouteProps>;
};
export { PrivateRoute };
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
declare const ConnectedPrivateRoute: import('react-redux').ConnectedComponent<
  {
    (props: PrivateRouteProps): JSX.Element;
    defaultProps: Partial<PrivateRouteProps>;
  },
  any
>;
export default ConnectedPrivateRoute;
