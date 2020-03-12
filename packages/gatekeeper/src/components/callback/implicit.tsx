import {
  AuthenticateAction,
  authenticateUser,
  getExtraData,
  getUser,
  isAuthenticated
} from '@onaio/session-reducer';
import qs from 'query-string';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionCreator, Store } from 'redux';
import { getSuccess, RecordAction, recordResult } from '../../ducks/gatekeeper';
import {
  getOnadataUserInfo,
  getProviderFromOptions,
  Providers,
  UserInfoFnType
} from '../../helpers/oauth';
import { fetchUser } from '../../helpers/services';
import {
  BaseCallbackComponent,
  BaseCallbackComponentProps,
  defaultBaseCallbackComponentProps
} from './base';
import { Component404, RenderErrorComponent } from './utils';

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
export const defaultOauthCallbackProps: Partial<OauthCallbackProps<RouteParams>> = {
  ...defaultBaseCallbackComponentProps,
  ErrorComponent: RenderErrorComponent,
  HTTP404Component: Component404,
  UnSuccessfulLoginComponent: RenderErrorComponent,
  authenticateActionCreator: authenticateUser,
  oAuthUserInfoGetter: getOnadataUserInfo,
  recordResultActionCreator: recordResult
};

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
const OauthCallback = (props: OauthCallbackProps<RouteParams>) => {
  const {
    ErrorComponent,
    HTTP404Component,
    LoadingComponent,
    SuccessfulLoginComponent,
    UnSuccessfulLoginComponent,
    authSuccess,
    authenticateActionCreator,
    authenticated,
    oAuthUserInfoGetter,
    providers,
    recordResultActionCreator,
    sessionData,
    sessionUser
  } = props;
  const locationHash = props.location.hash;
  const id = props.match.params.id;
  const parsedParams = qs.parse(location.search);
  const { error } = parsedParams;

  if (error) {
    return <ErrorComponent />;
  }

  if (!Object.keys(providers).includes(id)) {
    return <HTTP404Component />;
  }

  const providerOptions = providers[id];
  const { userUri } = providerOptions;
  const provider = getProviderFromOptions(providerOptions);

  useEffect(() => {
    if (authSuccess === null || authenticated === false) {
      fetchUser(
        locationHash,
        userUri,
        provider,
        authenticateActionCreator,
        recordResultActionCreator,
        oAuthUserInfoGetter
      ).catch(e => {
        /** do nothing - is this wise?? */
      });
    }
  }, []); // The empty array causes this effect to only run on mount

  const baseProps = {
    LoadingComponent,
    SuccessfulLoginComponent,
    UnSuccessfulLoginComponent,
    authSuccess,
    authenticated,
    sessionData,
    sessionUser
  };

  return <BaseCallbackComponent {...baseProps} />;
};

OauthCallback.defaultProps = defaultOauthCallbackProps;

export { OauthCallback }; // export the un-connected component

/** Connect the component to the store */

/** map state to props */
const mapStateToProps = (
  state: Partial<Store>,
  ownProps: Partial<OauthCallbackProps<RouteParams>>
) => {
  const result = {
    authSuccess: getSuccess(state),
    authenticated: isAuthenticated(state),
    sessionData: getExtraData(state),
    sessionUser: getUser(state)
  };
  Object.assign(result, ownProps);

  return result;
};

/** map dispatch to props */
const mapDispatchToProps = {
  authenticateActionCreator: authenticateUser,
  recordResultActionCreator: recordResult
};

/** created connected component */
const ConnectedOauthCallback = connect(mapStateToProps, mapDispatchToProps)(OauthCallback);

export default ConnectedOauthCallback;
