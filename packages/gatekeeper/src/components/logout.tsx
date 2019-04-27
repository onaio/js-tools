import { logOutUser } from '@onaio/session-reducer';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGIN_URL } from '../helpers/constants';

/** interface to describe props for Logout component */
export interface LogoutProps {
  logoutActionCreator: typeof logOutUser;
  redirectPath: string;
}

/** default props for Logout component */
export const defaultLogoutProps: LogoutProps = {
  logoutActionCreator: logOutUser,
  redirectPath: LOGIN_URL
};

/** Logout component */
const Logout = (props: LogoutProps) => {
  const { logoutActionCreator, redirectPath } = props;
  logoutActionCreator();
  return <Redirect to={redirectPath} />;
};

Logout.defaultProps = defaultLogoutProps;

export { Logout };

/** Connect the component to the store */

const mapDispatchToProps = { logoutActionCreator: logOutUser };

/** create connected component */

/** Connected Logout component */
const ConnectedLogout = connect(
  null,
  mapDispatchToProps
)(Logout);

export default ConnectedLogout;
