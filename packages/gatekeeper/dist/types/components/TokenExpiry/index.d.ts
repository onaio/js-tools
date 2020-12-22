/// <reference types="react" />
/** TokenExpired props interface */
export interface TokenExpiredProps {
  logoutLinkText: string;
  logoutUrl: string;
  sessionExpiryText: string;
}
/** default page to display when token expires */
declare const TokenExpired: {
  (props: TokenExpiredProps): JSX.Element;
  defaultProps: Pick<TokenExpiredProps, 'logoutLinkText' | 'sessionExpiryText'>;
};
export { TokenExpired };
