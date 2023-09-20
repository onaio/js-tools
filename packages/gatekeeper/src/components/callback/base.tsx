import { User } from '@onaio/session-reducer';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { RenderErrorComponent, RenderLoadingComponent, SuccessfulLogin } from './utils';

/** Route params interface */
export interface RouteParams {
  id: string;
}

/** interface for BaseCallbackComponentProps props */
export interface BaseCallbackComponentProps<G extends { [K in keyof G]?: string }>
  extends RouteComponentProps<G> {
  LoadingComponent: React.ElementType;
  SuccessfulLoginComponent: React.ElementType;
  UnSuccessfulLoginComponent: React.ElementType;
  authSuccess: boolean | null;
  authenticated: boolean;
  sessionData: { [key: string]: any };
  sessionUser: User;
  working: boolean;
}

/** default props for BaseCallbackComponent */
export const defaultBaseCallbackComponentProps: Partial<BaseCallbackComponentProps<RouteParams>> = {
  LoadingComponent: RenderLoadingComponent,
  SuccessfulLoginComponent: SuccessfulLogin,
  UnSuccessfulLoginComponent: RenderErrorComponent,
  authSuccess: null,
  authenticated: false,
  sessionData: {},
  sessionUser: {
    email: '',
    gravatar: '',
    name: '',
    username: ''
  },
  working: false
};

/** The oAuth callback component
 * This component should be on the page that receives the callback from the
 * oAuth provider.
 * It attempts to get the oAuth provider from the URL and then process the oAuth
 * login attempt.  This uses react-router
 * For instance, if you have a provider named onadata, this component should be
 * on a page that matches this pattern "https://example.com/callback/onadata"
 * Once successfully processed, the user is stored in the session Reducer.
 */
const BaseCallbackComponent = (props: BaseCallbackComponentProps<RouteParams>) => {
  const {
    LoadingComponent,
    SuccessfulLoginComponent,
    UnSuccessfulLoginComponent,
    authSuccess,
    authenticated,
    sessionData,
    sessionUser,
    working
  } = props;

  const successProps = { extraData: sessionData, user: sessionUser };

  return authSuccess === null || working === true ? (
    <LoadingComponent />
  ) : authenticated === true ? (
    <SuccessfulLoginComponent {...successProps} />
  ) : (
    <UnSuccessfulLoginComponent />
  );
};

BaseCallbackComponent.defaultProps = defaultBaseCallbackComponentProps;

export { BaseCallbackComponent };
