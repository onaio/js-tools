import { AuthenticateAction } from '@onaio/session-reducer';
import React from 'react';
import { ActionCreator } from 'redux';
import { RecordAction } from '../../ducks/gatekeeper';
import { Providers, UserInfoFnType } from '../../helpers/oauth';
import { BaseCallbackComponentProps } from './base';
/** Route params interface */
export interface RouteParams {
  id: string;
}
/** interface for OauthCallbackProps props */
export interface OauthCallbackProps<G> extends BaseCallbackComponentProps<G> {
  ErrorComponent: React.ElementType;
  HTTP404Component: React.ElementType;
  authenticateActionCreator: ActionCreator<AuthenticateAction>;
  oAuthUserInfoGetter: UserInfoFnType;
  providers: Providers;
  recordResultActionCreator: ActionCreator<RecordAction>;
}
/** default props for OauthCallback */
export declare const defaultOauthCallbackProps: Partial<OauthCallbackProps<RouteParams>>;
/** interface to describe state variables for OauthCallback */
export interface OauthCallbackState {
  loading: boolean;
}
/** The OAuth callback component for the implicit OAuth flow.
 * This component should be on the page that receives the callback from the
 * OAuth provider.
 * It attempts to get the OAuth provider from the URL and then process the OAuth
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
    | 'LoadingComponent'
    | 'SuccessfulLoginComponent'
    | 'UnSuccessfulLoginComponent'
    | 'history'
    | 'location'
    | 'staticContext'
    | 'ErrorComponent'
    | 'HTTP404Component'
    | 'oAuthUserInfoGetter'
  > &
    Partial<OauthCallbackProps<RouteParams>>
>;
export default ConnectedOauthCallback;
