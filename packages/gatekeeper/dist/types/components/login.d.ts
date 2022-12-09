import React from 'react';
import { Providers } from '../helpers/oauth';
/** types of supported authorization grant flow */
export declare enum AuthorizationGrantType {
    IMPLICIT = "IMPLICIT",
    AUTHORIZATION_CODE = "AUTHORIZATION_CODE"
}
/** describes object to pass to the OAuthHook */
export interface OAuthLoginHookOptions {
    providers: Providers;
    authorizationGrantType: AuthorizationGrantType;
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
export declare function useOAuthLogin(options: OAuthLoginHookOptions): {
    [key: string]: string;
};
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
        OAuthLoginPromptMessage: string;
        ProviderLinksComponent: (props: ProviderLinksProps) => JSX.Element; /** use the ProviderLinks component as the default */
        authorizationGrantType: AuthorizationGrantType;
        noProvidersMessage: string;
    };
};
export default OauthLogin;
