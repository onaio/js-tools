import { logOutUser } from '@onaio/session-reducer';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGIN_URL } from '../helpers/constants';

/** interface to describe props for Logout component
 * @member {typeof logOutUser}logoutActionCreator action creator that logs out user.
 * @member {string} redirectpath The URL we redirect to after loging out.
 * @member {string} logoutURL optional parameter provided if/when
 * you would like to logout of the authentication server.
 */
export interface LogoutProps {
  logoutActionCreator: typeof logOutUser;
  redirectPath: string;
  logoutURL: string | null;
}

/** default props for Logout component */
export const defaultLogoutProps: LogoutProps = {
  logoutActionCreator: logOutUser,
  logoutURL: null,
  redirectPath: LOGIN_URL
};

/**
 * Open another window and go to the logout URL.
 * @param {string} logoutURL URL string representing the auth server logout URL endpoint.
 */
function logoutFromAuthServer(logoutURL: string) {
  const logoutWindow: Window | null = window.open(logoutURL);
  const timer: NodeJS.Timeout = setInterval(() => {
    if (logoutWindow) {
      logoutWindow.close();
    }
    clearInterval(timer);
  }, 20);
}

/** Logout component */
const Logout = (props: LogoutProps) => {
  const { logoutActionCreator, redirectPath } = props;
  logoutActionCreator();
  if (props.logoutURL) {
    logoutFromAuthServer(props.logoutURL);
  }
  return <Redirect to={redirectPath} />;
};

Logout.defaultProps = defaultLogoutProps;

export { Logout };

/** Connect the component to the store */

const mapDispatchToProps = { logoutActionCreator: logOutUser };

/** Connected Logout component */
const ConnectedLogout = connect(
  null,
  mapDispatchToProps
)(Logout);

export default ConnectedLogout;
