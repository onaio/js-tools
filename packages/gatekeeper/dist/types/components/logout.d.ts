import { logOutUser } from '@onaio/session-reducer';
export type LogoutFunction = (
  logoutUserCreator: typeof logOutUser,
  redirectPath: string
) => null | JSX.Element;
/** interface to describe props for Logout component
 * @member {typeof logOutUser}logoutActionCreator action creator that logs out user.
 * @member {string} redirectPath The URL we redirect to after logging out.
 * @member {LogoutFunction} logoutFunction custom function to log user out of the Oauth server
 *  - called after logging the user out of the store.
 */
export interface LogoutProps {
  logoutActionCreator: typeof logOutUser;
  redirectPath: string;
  logoutFunction: LogoutFunction;
}
/** the default logout function : redirects to the predefined redirectPath
 * @param logoutProps - logout component props
 */
export declare const defaultLogout: LogoutFunction;
/** default props for Logout component */
export declare const defaultLogoutProps: LogoutProps;
/** Logout component */
declare const Logout: {
  (props: LogoutProps): JSX.Element | null;
  defaultProps: LogoutProps;
};
export { Logout };
/** Connected Logout component */
declare const ConnectedLogout: import('react-redux').ConnectedComponent<
  {
    (props: LogoutProps): JSX.Element | null;
    defaultProps: LogoutProps;
  },
  import('react-redux').Omit<
    Pick<LogoutProps, never> & {
      logoutActionCreator?: (() => import('@onaio/session-reducer').LogOutAction) | undefined;
      logoutFunction?: LogoutFunction | undefined;
      redirectPath?: string | undefined;
    } & {},
    'logoutActionCreator'
  >
>;
export default ConnectedLogout;
