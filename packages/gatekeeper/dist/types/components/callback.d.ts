import { AuthenticateAction, User } from '@onaio/session-reducer';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ActionCreator } from 'redux';
import { Providers } from '../helpers/oauth';
/** Route params interface */
export interface RouteParams {
  id: string;
}
/** interface for OauthCallbackProps props */
export interface OauthCallbackProps<G> extends RouteComponentProps<G> {
  ErrorComponent?: React.ElementType;
  HTTP404Component?: React.ElementType;
  SuccessfulLoginComponent?: React.ElementType;
  UnSuccessfulLoginComponent?: React.ElementType;
  authenticateActionCreator?: ActionCreator<AuthenticateAction>;
  authenticated?: boolean;
  providers: Providers;
  sessionData?: {
    [key: string]: any;
  };
  sessionUser?: User;
}
/** default 404 page component */
export declare const Component404: () => JSX.Element;
/** error page component */
export declare const RenderErrorComponent: () => JSX.Element;
/** interface for SuccessfulLogin props */
export interface SuccessfulLoginProps {
  extraData?: {
    [key: string]: any;
  } /** can be an object with any properties */;
  user: User;
}
/** successful login page component */
export declare const SuccessfulLogin: (props: SuccessfulLoginProps) => JSX.Element;
/** The oAuth callback component
 * This component should be on the page that receives the callback from the
 * oAuth provider.
 * It attempts to get the oAuth provider from the URL and then process the oAuth
 * login attempt.  This uses react-router
 * For instance, if you have a provider named onadata, this component should be
 * on a page that matches this pattern "https://example.com/callback/onadata"
 * Once successfully processed, the user is stored in the session Reducer.
 */
declare const OauthCallback: {
  (props: OauthCallbackProps<RouteParams>): JSX.Element;
  defaultProps: {
    ErrorComponent: () => JSX.Element;
    HTTP404Component: () => JSX.Element;
    SuccessfulLoginComponent: (props: SuccessfulLoginProps) => JSX.Element;
    UnSuccessfulLoginComponent: () => JSX.Element;
  };
};
export { OauthCallback };
/** created connected component */
declare const ConnectedOauthCallback: import('react-redux').ConnectedComponentClass<
  {
    (props: OauthCallbackProps<RouteParams>): JSX.Element;
    defaultProps: {
      ErrorComponent: () => JSX.Element;
      HTTP404Component: () => JSX.Element;
      SuccessfulLoginComponent: (props: SuccessfulLoginProps) => JSX.Element;
      UnSuccessfulLoginComponent: () => JSX.Element;
    };
  },
  Pick<
    OauthCallbackProps<RouteParams>,
    | 'providers'
    | 'match'
    | 'ErrorComponent'
    | 'HTTP404Component'
    | 'SuccessfulLoginComponent'
    | 'UnSuccessfulLoginComponent'
    | 'history'
    | 'location'
    | 'staticContext'
  > &
    Partial<OauthCallbackProps<RouteParams>>
>;
export default ConnectedOauthCallback;
