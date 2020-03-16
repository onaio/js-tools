/// <reference types="react" />
import { RouteComponentProps } from 'react-router';
import { Dimensions } from '../../helpers';
/** Interface for GARoute
 * Component will always render null since DOMwise we don't need
 * to do anything
 */
export interface GARouteProps extends RouteComponentProps {
  dimensions?: Dimensions;
}
/** Google analytics tracking with route component */
export declare const GARoute: (props: GARouteProps) => null;
/** Route that matches everything so that it can be re-rendered on every route change */
export declare const RouteTracker: () => JSX.Element;
export default RouteTracker;
