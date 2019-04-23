import {
  authenticateUser,
  getExtraData,
  getUser,
  isAuthenticated,
  User
} from '@onaio/session-reducer';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getProviderFromOptions, Providers } from '../helpers/oauth';
import { fetchUser } from '../helpers/services';

/** Route params interface */
export interface RouteParams {
  id: string;
}

/** interface for OauthCallbackProps props */
export interface OauthCallbackProps<G> extends RouteComponentProps<G> {
  ErrorComponentComponent?: React.ElementType;
  HTTP404Component?: React.ElementType;
  SuccessfulLoginComponent?: React.ElementType;
  UnSuccessfulLoginComponent?: React.ElementType;
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
const ErrorComponent = () => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">An error occurred!</p>
    </div>
  );
};

/** interface for SuccessfulLogin props */
interface SuccessfulLoginProps {
  extraData?: { [key: string]: any } /** can be an object with any properties */;
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
const OauthCallback = (props: any) => {
  const {
    HTTP404Component,
    SuccessfulLoginComponent,
    UnSuccessfulLoginComponent,
    authenticated,
    providers,
    sessionData,
    sessionUser
  } = props;
  const locationHash = props.location.hash;
  const id = props.match.params.id;

  if (!Object.keys(providers).includes(id) && HTTP404Component) {
    return <HTTP404Component />;
  }

  const providerOptions = providers[id];
  const { userUri } = providerOptions;
  const provider = getProviderFromOptions(providerOptions);

  useEffect(() => {
    if (authenticated === false) {
      fetchUser(locationHash, userUri, provider, props.authenticateUser);
    }
  }, []); // The empty array causes this effect to only run on mount

  const successProps = { extraData: sessionData, user: sessionUser };

  if (authenticated && SuccessfulLoginComponent) {
    return SuccessfulLoginComponent && <SuccessfulLoginComponent {...successProps} />;
  }

  return UnSuccessfulLoginComponent && <UnSuccessfulLoginComponent />;
};

OauthCallback.defaultProps = {
  ErrorComponentComponent: ErrorComponent,
  HTTP404Component: Component404,
  SuccessfulLoginComponent: SuccessfulLogin,
  UnSuccessfulLoginComponent: ErrorComponent
};

export { OauthCallback }; // export the un-connected component

/** Connect the component to the store */

const mapStateToProps = (state: any) => {
  return {
    authenticated: isAuthenticated(state),
    sessionData: getExtraData(state),
    sessionUser: getUser(state)
  };
};

const mapDispatchToProps = { authenticateUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OauthCallback);
