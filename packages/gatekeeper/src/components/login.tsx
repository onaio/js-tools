import React from 'react';
import { getProviderFromOptions, Providers } from '../helpers/oauth';

export enum AuthorizationGrantType {
  IMPLICIT = 'IMPLICIT',
  AUTHORIZATION_CODE = 'AUTHORIZATION_CODE'
}

/** interface for OauthLogin props */
export interface OauthLoginProps {
  ProviderLinksComponent?: React.ElementType;
  providers: Providers;

  authorizationGrant: AuthorizationGrantType;
}

/** interface for ProviderLinks props */
export interface ProviderLinksProps {
  providers: Providers;

  authorizationGrant: AuthorizationGrantType;
}

/** This component takes providers as a prop and renders a list of links to
 * log in with those providers
 */
export const ProviderLinks = (props: ProviderLinksProps) => {
  const { providers, authorizationGrant } = props;
  return (
    <div className="gatekeeper-login">
      <p className="gatekeeper-p">Please log in with one of the following providers</p>
      {/** loop through the providers */
      Object.entries(providers).map(item => {
        const thisProvider = getProviderFromOptions(
          item[1]
        ); /** get the ClientOAuth2 object for each provider */
        return (
          /** render a link for each provider */
          <p className="gatekeeper-p item" key={item[0]}>
            <a
              className="gatekeeper-btn"
              href={
                authorizationGrant === AuthorizationGrantType.IMPLICIT
                  ? thisProvider.token.getUri()
                  : authorizationGrant === AuthorizationGrantType.AUTHORIZATION_CODE
                  ? thisProvider.code.getUri()
                  : '#'
              }
            >
              {item[0]}
            </a>
          </p>
        );
      })}
    </div>
  );
};

/** This component provides the Oauth login page - it simply presents a list of
 * links of oAuth providers.
 */
const OauthLogin = (props: OauthLoginProps) => {
  const { providers, ProviderLinksComponent, authorizationGrant } = props;
  return ProviderLinksComponent && providers ? (
    <ProviderLinksComponent {...{ providers, authorizationGrant }} />
  ) : (
    <div className="gatekeeper-login">
      <p className="gatekeeper-p">No providers</p>
    </div>
  );
};

OauthLogin.defaultProps = {
  ProviderLinksComponent: ProviderLinks /** use the ProviderLinks component as the default */
};

export default OauthLogin;
