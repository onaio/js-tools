import { AuthenticateAction, LogOutAction } from '@onaio/session-reducer';
import React from 'react';
import { ActionCreator } from 'redux';
import { AuthenticationProgressAction, RecordAction } from '../../ducks/gatekeeper';
import { BaseCallbackComponentProps } from './base';
interface RouteParams {
  id: string;
}
/** interface for APICallbackProps props */
export interface APICallbackProps<
  G extends {
    [K in keyof G]?: string;
  }
> extends BaseCallbackComponentProps<G> {
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
export declare const defaultAPICallbackProps: Partial<APICallbackProps<RouteParams>>;
/**
 * This component gets OAuth state from an API endpoint that returns JSON
 * that represents the OAuth credentials.
 */
declare const APICallback: {
  (props: APICallbackProps<RouteParams>): React.JSX.Element;
  defaultProps: Partial<APICallbackProps<RouteParams>>;
};
export { APICallback };
/** created connected component */
declare const ConnectedAPICallback: import('react-redux').ConnectedComponent<
  {
    (props: APICallbackProps<RouteParams>): React.JSX.Element;
    defaultProps: Partial<APICallbackProps<RouteParams>>;
  },
  import('react-redux').Omit<
    Pick<APICallbackProps<RouteParams>, never> & {
      authenticated?: boolean | undefined;
      match?: import('react-router').match<RouteParams> | undefined;
      logoutActionCreator?: ActionCreator<LogOutAction> | undefined;
      working?: boolean | undefined;
      authenticateActionCreator?: ActionCreator<AuthenticateAction> | undefined;
      recordResultActionCreator?: ActionCreator<RecordAction> | undefined;
      authenticationProgressCreator?: ActionCreator<AuthenticationProgressAction> | undefined;
      LoadingComponent?: React.ElementType<any> | undefined;
      SuccessfulLoginComponent?: React.ElementType<any> | undefined;
      UnSuccessfulLoginComponent?: React.ElementType<any> | undefined;
      authSuccess?: boolean | null | undefined;
      sessionData?:
        | {
            [key: string]: any;
          }
        | undefined;
      sessionUser?: import('@onaio/session-reducer').User | undefined;
      history?: import('history').History<unknown> | undefined;
      location?: import('history').Location<unknown> | undefined;
      staticContext?: import('react-router').StaticContext | undefined;
      ErrorComponent?: React.ElementType<any> | undefined;
      HTTP404Component?: React.ElementType<any> | undefined;
      apiURL?: string | undefined;
    } & {},
    | 'authenticated'
    | 'logoutActionCreator'
    | 'working'
    | 'authenticateActionCreator'
    | 'recordResultActionCreator'
    | 'authenticationProgressCreator'
    | 'authSuccess'
    | 'sessionData'
    | 'sessionUser'
  > &
    Partial<APICallbackProps<RouteParams>>
>;
export default ConnectedAPICallback;
