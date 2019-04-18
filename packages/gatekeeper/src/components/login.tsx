import React from 'react';
import { getProviderFromOptions, Providers } from '../helpers/oauth';

/** interface for OauthLogin props */
export interface OauthLoginProps {
  ProviderLinksComponent?: React.ElementType;
  providers: Providers;
}

/** interface for ProviderLinks props */
export interface ProviderLinksProps {
  providers: Providers;
}

/** This component takes providers as a prop and renders a list of links to
 * log in with those providers
 */
export const ProviderLinks = (props: ProviderLinksProps) => {
  const { providers } = props;
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
            <a className="gatekeeper-btn" href={thisProvider.token.getUri()}>
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
  const { providers, ProviderLinksComponent } = props;
  return ProviderLinksComponent ? (
    <ProviderLinksComponent {...{ providers }} />
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
