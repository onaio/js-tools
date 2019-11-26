import { logOutUser } from '@onaio/session-reducer';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGIN_URL } from '../helpers/constants';
import { logoutFromAuthServer } from '../helpers/utils';

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
  logoutFunction: (logoutUrl: string) => void | null;
}

/** default props for Logout component */
export const defaultLogoutProps: LogoutProps = {
  logoutActionCreator: logOutUser,
  logoutFunction: logoutFromAuthServer,
  logoutURL: null,
  redirectPath: LOGIN_URL
};

/** Logout component */
const Logout = (props: LogoutProps) => {
  const { logoutActionCreator, redirectPath } = props;
  logoutActionCreator();
  if (props.logoutURL && props.logoutFunction) {
    props.logoutFunction(props.logoutURL);
  } else if (props.logoutURL) {
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
