import { logoutFromAuthServer } from '../../helpers/utils';

describe('gatekeeper/ConnectedLogout/logoutFromAuthServer', () => {
  it('calls window.open', () => {
    window.open = jest.fn();
    logoutFromAuthServer('authserver.opensrp/logout.do');
    expect(window.open).toBeCalledWith('authserver.opensrp/logout.do');
  });
});
