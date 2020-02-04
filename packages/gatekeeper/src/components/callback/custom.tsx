import {
  AuthenticateAction,
  authenticateUser,
  getExtraData,
  getUser,
  isAuthenticated,
  LogOutAction,
  logOutUser
} from '@onaio/session-reducer';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionCreator, Store } from 'redux';
import {
  authenticationProgress,
  AuthenticationProgressAction,
  getSuccess,
  isWorking,
  RecordAction,
  recordResult
} from '../../ducks/gatekeeper';
import { fetchState } from '../../helpers/services';
import { errorCallback } from '../../helpers/utils';
import {
  BaseCallbackComponent,
  BaseCallbackComponentProps,
  defaultBaseCallbackComponentProps
} from './base';
import { Component404, RenderErrorComponent } from './utils';

interface RouteParams {
  id: string;
}

/** interface for APICallbackProps props */
export interface APICallbackProps<G> extends BaseCallbackComponentProps<G> {
  ErrorComponent: React.ElementType;
  HTTP404Component: React.ElementType;
  apiURL: string;
  authenticateActionCreator: ActionCreator<AuthenticateAction>;
  authenticationProgressCreator: ActionCreator<AuthenticationProgressAction>;
  logoutActionCreator: ActionCreator<LogOutAction>;
  recordResultActionCreator: ActionCreator<RecordAction>;
  working: boolean;
}

/** default props for OauthCallback */
export const defaultAPICallbackProps: Partial<APICallbackProps<RouteParams>> = {
  ...defaultBaseCallbackComponentProps,
  ErrorComponent: RenderErrorComponent,
  HTTP404Component: Component404,
  UnSuccessfulLoginComponent: RenderErrorComponent,
  authenticateActionCreator: authenticateUser,
  authenticationProgressCreator: authenticationProgress,
  logoutActionCreator: logOutUser,
  recordResultActionCreator: recordResult,
  working: false
};

/**
 * This component gets OAuth state from an API endpoint that returns JSON
 * that represents the OAuth credentials.
 */
const APICallback = (props: APICallbackProps<RouteParams>) => {
  const {
    LoadingComponent,
    SuccessfulLoginComponent,
    UnSuccessfulLoginComponent,
    apiURL,
    authSuccess,
    authenticated,
    authenticateActionCreator,
    recordResultActionCreator,
    authenticationProgressCreator,
    logoutActionCreator,
    sessionData,
    sessionUser,
    working
  } = props;

  useEffect(() => {
    if (authSuccess === null || authenticated === false) {
      fetchState(apiURL, {
        authenticateActionCreator,
        authenticationProgressCreator,
        errorCallbackFn: errorCallback,
        logoutActionCreator,
        recordResultActionCreator
      }).catch(e => {
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
    sessionUser,
    working
  };

  return <BaseCallbackComponent {...baseProps} />;
};

APICallback.defaultProps = defaultAPICallbackProps;

export { APICallback };

/** Connect the component to the store */

/** map state to props */
const mapStateToProps = (
  state: Partial<Store>,
  ownProps: Partial<APICallbackProps<RouteParams>>
) => {
  const result = {
    authSuccess: getSuccess(state),
    authenticated: isAuthenticated(state),
    sessionData: getExtraData(state),
    sessionUser: getUser(state),
    working: isWorking(state)
  };
  Object.assign(result, ownProps);

  return result;
};

/** map dispatch to props */
const mapDispatchToProps = {
  authenticateActionCreator: authenticateUser,
  authenticationProgressCreator: authenticationProgress,
  logoutActionCreator: logOutUser,
  recordResultActionCreator: recordResult
};

/** created connected component */
const ConnectedAPICallback = connect(
  mapStateToProps,
  mapDispatchToProps
)(APICallback);

export default ConnectedAPICallback;
