import OauthLogin, { OauthLoginProps, ProviderLinks, ProviderLinksProps } from './components/login';

import ConnectedOauthCallback, {
  Component404,
  OauthCallback,
  OauthCallbackProps,
  RenderErrorComponent,
  RouteParams,
  SuccessfulLogin,
  SuccessfulLoginProps
} from './components/callback';

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
  errorCallback,
  fetchUser,
  getOnadataUserInfo,
  getProviderFromOptions,
  oauth2Callback,
  Component404,
  ConnectedOauthCallback,
  ErrorCallback,
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
  RenderErrorComponent,
  RouteParams,
  UserInfoFnType
};
