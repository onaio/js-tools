import React from 'react';
import { NO_PROVIDERS, OAUTH_LOGIN_PROMPT } from '../helpers/constants';
import { getProviderFromOptions, Providers } from '../helpers/oauth';

/** types of supported authorization grant flow */
export enum AuthorizationGrantType {
  IMPLICIT = 'IMPLICIT',
  AUTHORIZATION_CODE = 'AUTHORIZATION_CODE'
}

/** describes object to pass to the OAuthHook */
export interface OAuthLoginHookOptions {
  providers: Providers;
  authorizationGrant: AuthorizationGrantType;
}

/** interface for ProviderLinks props */
export interface ProviderLinksProps extends OAuthLoginHookOptions {
  OAuthLoginPromptMessage: string;
}

/** interface for OauthLogin props */
export interface OauthLoginProps extends ProviderLinksProps {
  ProviderLinksComponent: React.ElementType;
  noProvidersMessage: string;
}

/** hook returns an object where the provider name is the key and the value is
 * the authorizationUri,
 * @param {OAuthLoginHookOptions} options - initial data required for processing
 * @return {[key: string]: string} - an object
 */
export function useOAuthLogin(options: OAuthLoginHookOptions): { [key: string]: string } {
  const { providers: rawProviders, authorizationGrant } = options;

  /** get the ClientOAuth2 object for each provider */
  const authorizationUris: { [key: string]: string } = {};
  Object.entries(rawProviders).map(item => {
    const thisProvider = getProviderFromOptions(item[1]);
    const authorizationUri =
      authorizationGrant === AuthorizationGrantType.IMPLICIT
        ? thisProvider.token.getUri()
        : authorizationGrant === AuthorizationGrantType.AUTHORIZATION_CODE
        ? thisProvider.code.getUri()
        : '#';
    authorizationUris[item[0]] = authorizationUri;
    return authorizationUris;
  });

  return authorizationUris;
}

/** This component takes providers as a prop and renders a list of links to
 * log in with those providers
 */
export const ProviderLinks = (props: ProviderLinksProps) => {
  const { providers, authorizationGrant, OAuthLoginPromptMessage } = props;
  const authorizationUris = useOAuthLogin({ providers, authorizationGrant });
  return (
    <div className="gatekeeper-login">
      <p className="gatekeeper-p">{OAuthLoginPromptMessage}</p>
      {/** loop through the authorization uris */
      Object.entries(authorizationUris).map(item => {
        return (
          /** render a link for each provider */
          <p className="gatekeeper-p item" key={item[0]}>
            <a className="gatekeeper-btn" href={item[1]}>
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
  const {
    providers,
    ProviderLinksComponent,
    authorizationGrant,
    noProvidersMessage,
    OAuthLoginPromptMessage
  } = props;
  return ProviderLinksComponent && providers ? (
    <ProviderLinksComponent {...{ providers, authorizationGrant, OAuthLoginPromptMessage }} />
  ) : (
    <div className="gatekeeper-login">
      <p className="gatekeeper-p">{noProvidersMessage}</p>
    </div>
  );
};

OauthLogin.defaultProps = {
  OAuthLoginPromptMessage: OAUTH_LOGIN_PROMPT,
  ProviderLinksComponent: ProviderLinks /** use the ProviderLinks component as the default */,
  authorizationGrant: AuthorizationGrantType.IMPLICIT,
  noProvidersMessage: NO_PROVIDERS
};

export default OauthLogin;
