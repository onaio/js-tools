import {
  AuthenticateAction,
  authenticateUser,
  getExtraData,
  getUser,
  isAuthenticated,
  User
} from '@onaio/session-reducer';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreator, Store } from 'redux';
import {
  getOnadataUserInfo,
  getProviderFromOptions,
  Providers,
  UserInfoFnType
} from '../helpers/oauth';
import { fetchUser } from '../helpers/services';

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
  authenticateActionCreator: ActionCreator<AuthenticateAction>;
  authenticated: boolean;
  oAuthUserInfoGetter: UserInfoFnType;
  providers: Providers;
  sessionData: { [key: string]: any };
  sessionUser: User;
}

/** default 404 page component */
export const Component404 = () => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">Nothing here!</p>
    </div>
  );
};

/** error page component */
export const RenderErrorComponent = () => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">An error occurred!</p>
    </div>
  );
};

/** loading component */
export const RenderLoadingComponent = () => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">Please wait...</p>
    </div>
  );
};

/** interface for SuccessfulLogin props */
export interface SuccessfulLoginProps {
  extraData?: { [key: string]: any } /** can be an object with any properties */;
  user: User;
}

/** successful login page component */
export const SuccessfulLogin = (props: SuccessfulLoginProps) => {
  const { user } = props;
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">Welcome back, {user.username}!</p>
    </div>
  );
};

/** default props for OauthCallback */
export const defaultOauthCallbackProps: Partial<OauthCallbackProps<RouteParams>> = {
  ErrorComponent: RenderErrorComponent,
  HTTP404Component: Component404,
  LoadingComponent: RenderLoadingComponent,
  SuccessfulLoginComponent: SuccessfulLogin,
  UnSuccessfulLoginComponent: RenderErrorComponent,
  authenticateActionCreator: authenticateUser,
  authenticated: false,
  oAuthUserInfoGetter: getOnadataUserInfo,
  sessionData: {},
  sessionUser: {
    email: '',
    gravatar: '',
    name: '',
    username: ''
  }
};

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
class OauthCallback extends React.Component<OauthCallbackProps<RouteParams>, OauthCallbackState> {
  public static defaultProps = defaultOauthCallbackProps;
  private isMounted: boolean;

  constructor(props: OauthCallbackProps<RouteParams>) {
    super(props);
    this.isMounted = false;
    this.state = {
      loading: false
    };
  }

  public componentDidMount() {
    this.isMounted = true;
    const { authenticateActionCreator, oAuthUserInfoGetter, providers } = this.props;
    const locationHash = this.props.location.hash;
    const id = this.props.match.params.id;
    if (Object.keys(providers).includes(id)) {
      const providerOptions = providers[id];
      const { userUri } = providerOptions;
      const provider = getProviderFromOptions(providerOptions);
      this.setState({ loading: true });
      fetchUser(locationHash, userUri, provider, authenticateActionCreator, oAuthUserInfoGetter)
        .catch(e => {
          /** do nothing - is this wise? */
        })
        .finally(() => {
          if (this.isMounted === true) {
            this.setState({ loading: false });
          }
        });
    }
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  public render() {
    const {
      ErrorComponent,
      HTTP404Component,
      LoadingComponent,
      SuccessfulLoginComponent,
      UnSuccessfulLoginComponent,
      authenticated,
      providers,
      sessionData,
      sessionUser
    } = this.props;
    const id = this.props.match.params.id;
    const parsedParams = qs.parse(this.props.location.search);
    const { error } = parsedParams;
    const successProps = { extraData: sessionData, user: sessionUser };

    if (error) {
      return <ErrorComponent />;
    }

    if (!Object.keys(providers).includes(id)) {
      return <HTTP404Component />;
    }

    // if (this.state.loading === true) {
    //   return <LoadingComponent />
    // }

    return authenticated ? (
      <SuccessfulLoginComponent {...successProps} />
    ) : (
      <UnSuccessfulLoginComponent />
    );
  }
}

export { OauthCallback }; // export the un-connected component

/** Connect the component to the store */

/** map state to props */
const mapStateToProps = (
  state: Partial<Store>,
  ownProps: Partial<OauthCallbackProps<RouteParams>>
) => {
  const result = {
    authenticated: isAuthenticated(state),
    sessionData: getExtraData(state),
    sessionUser: getUser(state)
  };
  Object.assign(result, ownProps);

  return result;
};

/** map dispatch to props */
const mapDispatchToProps = { authenticateActionCreator: authenticateUser };

/** created connected component */
const ConnectedOauthCallback = connect(
  mapStateToProps,
  mapDispatchToProps
)(OauthCallback);

export default ConnectedOauthCallback;
