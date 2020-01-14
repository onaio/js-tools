import {
  AuthenticateAction,
  authenticateUser,
  getExtraData,
  getUser,
  isAuthenticated
} from '@onaio/session-reducer';
import React, { useEffect } from 'react';
import { ActionCreator, Store } from 'redux';
import { getSuccess, RecordAction, recordResult } from '../../ducks/gatekeeper';
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
  recordResultActionCreator: ActionCreator<RecordAction>;
}

/** default props for OauthCallback */
export const defaultAPICallbackProps: Partial<APICallbackProps<RouteParams>> = {
  ...defaultBaseCallbackComponentProps,
  ErrorComponent: RenderErrorComponent,
  HTTP404Component: Component404,
  UnSuccessfulLoginComponent: RenderErrorComponent,
  authenticateActionCreator: authenticateUser,
  recordResultActionCreator: recordResult
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
    sessionData,
    sessionUser
  } = props;

  useEffect(() => {
    if (authSuccess === null || authenticated === false) {
      fetchState(apiURL, authenticateActionCreator, recordResultActionCreator, errorCallback).catch(
        e => {
          /** do nothing - is this wise?? */
        }
      );
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

APICallback.defaultProps = defaultAPICallbackProps;

export { APICallback };