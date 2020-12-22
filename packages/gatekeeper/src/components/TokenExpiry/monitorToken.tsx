import { isTokenExpired } from '@onaio/session-reducer';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Store } from 'redux';

/** MonitorTokenExpiry props interface  */
export interface MonitorTokenExpiryProps {
  tokenExpired: boolean;
  redirectUrl: string;
}

/** component that monitors token expiry and redirects to */
const MonitorTokenExpiry = (props: MonitorTokenExpiryProps) => {
  const { tokenExpired, redirectUrl } = props;
  if (tokenExpired) {
    return <Redirect to={redirectUrl} />;
  }
  return null;
};

/** default MonitorTokenExpiry props */
type DefaultMonitorProps = Pick<MonitorTokenExpiryProps, 'tokenExpired'>;
const defaultMonitorTokenExpiryProps: DefaultMonitorProps = {
  tokenExpired: false
};
MonitorTokenExpiry.defaultProps = defaultMonitorTokenExpiryProps;
export { MonitorTokenExpiry };

interface DispatchedStateProps {
  tokenExpired: boolean;
}

/** map state to props */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const tokenExpired = isTokenExpired(state);
  return {
    tokenExpired
  };
};

/** connect to store component */
const ConnectedMonitorTokenExpiry = connect(mapStateToProps, null)(MonitorTokenExpiry);

export default ConnectedMonitorTokenExpiry;
