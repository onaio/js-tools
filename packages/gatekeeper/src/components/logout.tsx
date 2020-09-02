import { logOutUser } from '@onaio/session-reducer';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGIN_URL } from '../helpers/constants';

export type LogoutFunction = (props: LogoutProps) => null | JSX.Element;

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
export const defaultLogout = (logOutProps: LogoutProps) => {
  const { redirectPath } = logOutProps;
  return <Redirect to={redirectPath} />;
};

/** default props for Logout component */
export const defaultLogoutProps: LogoutProps = {
  logoutActionCreator: logOutUser,
  logoutFunction: defaultLogout,
  redirectPath: LOGIN_URL
};

/** Logout component */
const Logout = (props: LogoutProps) => {
  const { logoutActionCreator, logoutFunction } = props;
  logoutActionCreator();
  const res = logoutFunction(props);
  return logoutFunction(props);
};

Logout.defaultProps = defaultLogoutProps;

export { Logout };

/** Connect the component to the store */
const mapDispatchToProps = { logoutActionCreator: logOutUser };

/** Connected Logout component */
const ConnectedLogout = connect(null, mapDispatchToProps)(Logout);

export default ConnectedLogout;
