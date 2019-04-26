import { AuthenticateAction, User } from '@onaio/session-reducer';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ActionCreator } from 'redux';
import { RecordAction } from '../ducks/gatekeeper';
import { Providers, UserInfoFnType } from '../helpers/oauth';
/** Route params interface */
export interface RouteParams {
  id: string;
}
/** interface for OauthCallbackProps props */
export interface OauthCallbackProps<G> extends RouteComponentProps<G> {
  ErrorComponent: React.ElementType;
  HTTP404Component: React.ElementType;
  LoadingComponent: React.ElementType;
  SuccessfulLoginComponent: React.ElementType;
  UnSuccessfulLoginComponent: React.ElementType;
  authSuccess: boolean | null;
  authenticateActionCreator: ActionCreator<AuthenticateAction>;
  authenticated: boolean;
  oAuthUserInfoGetter: UserInfoFnType;
  providers: Providers;
  recordResultActionCreator: ActionCreator<RecordAction>;
  sessionData: {
    [key: string]: any;
  };
  sessionUser: User;
}
/** default 404 page component */
export declare const Component404: () => JSX.Element;
/** error page component */
export declare const RenderErrorComponent: () => JSX.Element;
/** loading component */
export declare const RenderLoadingComponent: () => JSX.Element;
/** interface for SuccessfulLogin props */
export interface SuccessfulLoginProps {
  extraData?: {
    [key: string]: any;
  } /** can be an object with any properties */;
  user: User;
}
/** successful login page component */
export declare const SuccessfulLogin: (props: SuccessfulLoginProps) => JSX.Element;
/** default props for OauthCallback */
export declare const defaultOauthCallbackProps: Partial<OauthCallbackProps<RouteParams>>;
/** interface to describe state variables for OauthCallback */
export interface OauthCallbackState {
  loading: boolean;
}
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
  defaultProps: Partial<OauthCallbackProps<RouteParams>>;
};
export { OauthCallback };
/** created connected component */
declare const ConnectedOauthCallback: import('react-redux').ConnectedComponentClass<
  {
    (props: OauthCallbackProps<RouteParams>): JSX.Element;
    defaultProps: Partial<OauthCallbackProps<RouteParams>>;
  },
  Pick<
    OauthCallbackProps<RouteParams>,
    | 'providers'
    | 'match'
    | 'ErrorComponent'
    | 'HTTP404Component'
    | 'LoadingComponent'
    | 'SuccessfulLoginComponent'
    | 'UnSuccessfulLoginComponent'
    | 'oAuthUserInfoGetter'
    | 'history'
    | 'location'
    | 'staticContext'
  > &
    Partial<OauthCallbackProps<RouteParams>>
>;
export default ConnectedOauthCallback;
