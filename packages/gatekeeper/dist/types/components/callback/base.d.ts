import { User } from '@onaio/session-reducer';
import React from 'react';
import { RouteComponentProps } from 'react-router';
/** Route params interface */
export interface RouteParams {
  id: string;
}
/** interface for BaseCallbackComponentProps props */
export interface BaseCallbackComponentProps<G> extends RouteComponentProps<G> {
  LoadingComponent: React.ElementType;
  SuccessfulLoginComponent: React.ElementType;
  UnSuccessfulLoginComponent: React.ElementType;
  authSuccess: boolean | null;
  authenticated: boolean;
  sessionData: {
    [key: string]: any;
  };
  sessionUser: User;
  working: boolean;
}
/** default props for BaseCallbackComponent */
export declare const defaultBaseCallbackComponentProps: Partial<BaseCallbackComponentProps<
  RouteParams
>>;
/** The oAuth callback component
 * This component should be on the page that receives the callback from the
 * oAuth provider.
 * It attempts to get the oAuth provider from the URL and then process the oAuth
 * login attempt.  This uses react-router
 * For instance, if you have a provider named onadata, this component should be
 * on a page that matches this pattern "https://example.com/callback/onadata"
 * Once successfully processed, the user is stored in the session Reducer.
 */
declare const BaseCallbackComponent: {
  (props: BaseCallbackComponentProps<RouteParams>): JSX.Element;
  defaultProps: Partial<BaseCallbackComponentProps<RouteParams>>;
};
export { BaseCallbackComponent };
