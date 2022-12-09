import { AuthenticateAction, LogOutAction } from '@onaio/session-reducer';
import React from 'react';
import { ActionCreator } from 'redux';
import { AuthenticationProgressAction, RecordAction } from '../../ducks/gatekeeper';
import { BaseCallbackComponentProps } from './base';
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
export declare const defaultAPICallbackProps: Partial<APICallbackProps<RouteParams>>;
/**
 * This component gets OAuth state from an API endpoint that returns JSON
 * that represents the OAuth credentials.
 */
declare const APICallback: {
    (props: APICallbackProps<RouteParams>): JSX.Element;
    defaultProps: Partial<APICallbackProps<RouteParams>>;
};
export { APICallback };
/** created connected component */
declare const ConnectedAPICallback: import("react-redux").ConnectedComponent<{
    (props: APICallbackProps<RouteParams>): JSX.Element;
    defaultProps: Partial<APICallbackProps<RouteParams>>;
}, Pick<APICallbackProps<RouteParams>, "match" | "LoadingComponent" | "SuccessfulLoginComponent" | "UnSuccessfulLoginComponent" | "history" | "location" | "staticContext" | "ErrorComponent" | "HTTP404Component" | "apiURL"> & Partial<APICallbackProps<RouteParams>>>;
export default ConnectedAPICallback;
