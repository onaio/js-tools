import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { Dimensions, trackPage } from '../../helpers';

/** Interface for GARoute
 * Component will always render null since DOMwise we don't need
 * to do anything
 */
export interface GARouteProps extends RouteComponentProps {
  dimensions?: Dimensions;
}

/** Google analytics tracking with route component */
export const GARoute = (props: GARouteProps) => {
  useEffect(() => {
    const page = props.location.pathname + props.location.search;
    trackPage(page);
  }, [props.location.pathname, props.location.search]);

  return null;
};

/** Route that matches everything so that it can be re-rendered on every route change */
export const RouteTracker = () => <Route component={GARoute} />;

export default RouteTracker;
