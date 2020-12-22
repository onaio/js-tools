/// <reference types="react" />
/** MonitorTokenExpiry props interface  */
export interface MonitorTokenExpiryProps {
  tokenExpired: boolean;
  redirectUrl: string;
}
/** component that monitors token expiry and redirects to */
declare const MonitorTokenExpiry: {
  (props: MonitorTokenExpiryProps): JSX.Element | null;
  defaultProps: Pick<MonitorTokenExpiryProps, 'tokenExpired'>;
};
export { MonitorTokenExpiry };
/** connect to store component */
declare const ConnectedMonitorTokenExpiry: import('react-redux').ConnectedComponent<
  {
    (props: MonitorTokenExpiryProps): JSX.Element | null;
    defaultProps: Pick<MonitorTokenExpiryProps, 'tokenExpired'>;
  },
  Pick<MonitorTokenExpiryProps, 'tokenExpired' | 'redirectUrl'>
>;
export default ConnectedMonitorTokenExpiry;
