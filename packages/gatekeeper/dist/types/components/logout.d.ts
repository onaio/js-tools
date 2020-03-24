/// <reference types="react" />
import { logOutUser } from '@onaio/session-reducer';
/** interface to describe props for Logout component
 * @member {typeof logOutUser}logoutActionCreator action creator that logs out user.
 * @member {string} redirectPath The URL we redirect to after logging out.
 * @member {string} logoutURL the url of the logout endpoint of the Oauth server.
 * @member {(logoutUrl: string) => void} logoutFunction custom function to log user out of the Oauth server.
 */
export interface LogoutProps {
  logoutActionCreator: typeof logOutUser;
  redirectPath: string;
  logoutURL: string | null;
  logoutFunction: (logoutUrl: string) => void | null;
}
/** default props for Logout component */
export declare const defaultLogoutProps: LogoutProps;
/** Logout component */
declare const Logout: {
  (props: LogoutProps): JSX.Element;
  defaultProps: LogoutProps;
};
export { Logout };
/** Connected Logout component */
declare const ConnectedLogout: import('react-redux').ConnectedComponent<
  {
    (props: LogoutProps): JSX.Element;
    defaultProps: LogoutProps;
  },
  Pick<LogoutProps, 'redirectPath' | 'logoutURL' | 'logoutFunction'>
>;
export default ConnectedLogout;
