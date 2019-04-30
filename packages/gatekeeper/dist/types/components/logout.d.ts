/// <reference types="react" />
import { logOutUser } from '@onaio/session-reducer';
/** interface to describe props for Logout component */
export interface LogoutProps {
  logoutActionCreator: typeof logOutUser;
  redirectPath: string;
}
/** default props for Logout component */
export declare const defaultLogoutProps: LogoutProps;
/** Logout component */
declare const Logout: {
  (props: LogoutProps): JSX.Element;
  defaultProps: LogoutProps;
};
export { Logout };
/** create connected component */
/** Connected Logout component */
declare const ConnectedLogout: import('react-redux').ConnectedComponentClass<
  {
    (props: LogoutProps): JSX.Element;
    defaultProps: LogoutProps;
  },
  Pick<LogoutProps, 'redirectPath'>
>;
export default ConnectedLogout;
