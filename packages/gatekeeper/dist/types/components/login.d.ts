import React from 'react';
import { Providers } from '../helpers/oauth';
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
export declare const ProviderLinks: (props: ProviderLinksProps) => JSX.Element;
/** This component provides the Oauth login page - it simply presents a list of
 * links of oAuth providers.
 */
declare const OauthLogin: {
  (props: OauthLoginProps): JSX.Element;
  defaultProps: {
    ProviderLinksComponent: (
      props: ProviderLinksProps
    ) => JSX.Element /** use the ProviderLinks component as the default */;
  };
};
export default OauthLogin;
