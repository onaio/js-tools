import OauthLogin, { OauthLoginProps, ProviderLinks, ProviderLinksProps } from './components/login';

import ConnectedLogout, { defaultLogoutProps, Logout, LogoutProps } from './components/logout';

import ConnectedOauthCallback, {
  Component404,
  defaultOauthCallbackProps,
  OauthCallback,
  OauthCallbackProps,
  RenderErrorComponent,
  RouteParams,
  SuccessfulLogin,
  SuccessfulLoginProps
} from './components/callback';

import gateKeeperReducer, {
  GateKeeperState,
  getResult,
  getSuccess,
  ImmutableGateKeeperState,
  initialState as initialGateKeeperState,
  RECORD,
  RecordAction,
  recordResult,
  reducerName as gateKeeperReducerName
} from './ducks/gatekeeper';

import {
  getOnadataUserInfo,
  getProviderFromOptions,
  OauthOptions,
  Providers,
  UserInfoFnType
} from './helpers/oauth';

import { fetchUser, oauth2Callback } from './helpers/services';

import { errorCallback, ErrorCallback } from './helpers/utils';

export {
  defaultLogoutProps,
  defaultOauthCallbackProps,
  errorCallback,
  fetchUser,
  gateKeeperReducer,
  gateKeeperReducerName,
  getOnadataUserInfo,
  getProviderFromOptions,
  getResult,
  getSuccess,
  initialGateKeeperState,
  oauth2Callback,
  recordResult,
  Component404,
  ConnectedLogout,
  ConnectedOauthCallback,
  ErrorCallback,
  GateKeeperState,
  ImmutableGateKeeperState,
  Logout,
  LogoutProps,
  OauthCallback,
  OauthCallbackProps,
  OauthLogin,
  OauthLoginProps,
  OauthOptions,
  Providers,
  ProviderLinks,
  ProviderLinksProps,
  SuccessfulLogin,
  SuccessfulLoginProps,
  RecordAction,
  RenderErrorComponent,
  RouteParams,
  UserInfoFnType,
  RECORD
};
