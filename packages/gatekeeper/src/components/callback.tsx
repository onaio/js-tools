import session, { initialState, User } from '@onaio/session-reducer';
import React, { useEffect, useReducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { getProviderFromOptions, Providers } from '../helpers/oauth';
import { fetchUser } from '../helpers/services';

/** Route params interface */
export interface RouteParams {
  id: string;
}

/** interface for OauthCallbackProps props */
export interface OauthCallbackProps<G> extends RouteComponentProps<G> {
  ErrorPageComponent?: React.ElementType;
  HTTP404Component?: React.ElementType;
  SuccessfulLoginComponent?: React.ElementType;
  providers: Providers;
}

/** default 404 page component */
const Component404 = () => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">Nothing here!</p>
    </div>
  );
};

/** error page component */
const ErrorPage = () => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">An error occurred!</p>
    </div>
  );
};

/** interface for SuccessfulLogin props */
interface SuccessfulLoginProps {
  user: User;
}

/** successful login page component */
const SuccessfulLogin = (props: SuccessfulLoginProps) => {
  const { user } = props;
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">Welcome back, {user.username}!</p>
    </div>
  );
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
const OauthCallback = (props: OauthCallbackProps<RouteParams>) => {
  /** useReducer helps us to get both the session state and the dispatch */
  const [sessionState, sessionDispatch] = useReducer(session, initialState);

  const { HTTP404Component, SuccessfulLoginComponent, providers } = props;
  const locationHash = props.location.hash;
  const id = props.match.params.id;

  if (!Object.keys(providers).includes(id) && HTTP404Component) {
    return <HTTP404Component />;
  }

  const providerOptions = providers[id];
  const { userUri } = providerOptions;
  const provider = getProviderFromOptions(providerOptions);

  useEffect(() => {
    if (sessionState.authenticated === false) {
      fetchUser(locationHash, userUri, sessionDispatch, provider);
    }
  });

  const successProps = { user: sessionState.user };

  return SuccessfulLoginComponent && <SuccessfulLoginComponent {...successProps} />;
};

OauthCallback.defaultProps = {
  ErrorPageComponent: ErrorPage,
  HTTP404Component: Component404,
  SuccessfulLoginComponent: SuccessfulLogin
};

export default OauthCallback;
