# GateKeeper

GateKeeper provides re-usable tools that help you add authentication to your React application.

GateKeeper currently supports authentication with oAuth2 using the [implicit grant type](https://oauth.net/2/grant-types/implicit/).

## Setting Up

For best results, we recommend that after you install this package, you set up the included GateKeeper reducer in your redux store. Please see below for additional information on this reducer.

## General purpose components

GateKeeper provides a simple logout component to sign out an authenticated user.

You can use it in this way:

```tsx
import { ConnectedLogout } from `@onaio/gatekeeper`;

class App extends Component {
  render() {
    return (
     ...
        <Router>
          <div className={'main-container'}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={ConnectedLogout} />
            </Switch>
          </div>
        </Router>
     ...
    )
  }
}

export default App
```

You can use the logout component to log out of the authentication server as well. This can be done by passing a logoutURL prop to ConnectedLogout as follows:

```tsx
import { ConnectedLogout } from `@onaio/gatekeeper`;

class App extends Component {
  render() {
    return (
     ...
        <Router>
          <div className={'main-container'}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={() => (
              <ConnectedLogout
                {...({ logoutURL: 'https://www.auth2serversURL/logout' } as Partial<LogoutProps>)}
              />
            )} />
            </Switch>
          </div>
        </Router>
     ...
    )
  }
}

export default App
```

### Extending the logout component

The logout component takes these props that are useful in extending it:

- **logoutActionCreator**: a [Redux action creator](https://redux.js.org/basics/actions#action-creators) to log out the user. The default that is used here is the `logoutUser` action creator from the [session reducer package](https://github.com/onaio/js-tools/tree/master/packages/session-reducer).
- **redirectPath**: the path that the user will be redirected to if they are not logged in. Default is "/login".

## Working with oAuth2

### oAuth2 Login Component

GateKeeper provides a simple login page component to help start the oAuth2 process.

You can use it this way:

```tsx
import { OauthLogin } from `@onaio/gatekeeper`;

/** define some oAuth2 providers */
export const providers = {
  onadata: {
    accessTokenUri: 'https://stage-api.ona.io/o/token/',
    authorizationUri: 'https://stage-api.ona.io/o/authorize/',
    clientId: 'the client id goes here',
    redirectUri: 'https://example.com/oauth/callback/onadata/',
    scopes: ['read', 'write'],
    state: 'abc',
    userUri: 'https://stage-api.ona.io/api/v1/user.json'
  }
};

/** now you can use the component like this <OauthLogin {...props} /> */
/** For example using react router and App */
import { Route, Switch } from 'react-router';
import { OauthLogin } from `@onaio/gatekeeper`;

class App extends Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route
            exact={true}
            path="/login"
            render={routeProps => <OauthLogin providers={providers} {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}
```

### oAuth2 Callback Component

GateKeeper also provides a component that handles the oAuth2 callback from the oAuth2 provider.

Using it is just as easy as with the login component.

```tsx
import { ConnectedOauthCallback } from `@onaio/gatekeeper`;

/** define some oAuth2 providers */
const providers = {
  onadata: {
    accessTokenUri: 'https://stage-api.ona.io/o/token/',
    authorizationUri: 'https://stage-api.ona.io/o/authorize/',
    clientId: 'the client id goes here',
    redirectUri: 'https://example.com/oauth/callback/onadata/',
    scopes: ['read', 'write'],
    state: 'abc',
    userUri: 'https://stage-api.ona.io/api/v1/user.json'
  }
};

/** now you can use the component like this <ConnectedOauthCallback {...props} /> */
/** For example using react router and App */
import { Route, Switch } from 'react-router';
import { ConnectedOauthCallback } from `@onaio/gatekeeper`;

class App extends Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route
            exact={true}
            path="/oauth/callback/:id"
            render={routeProps => <ConnectedOauthCallback providers={providers} {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}
```

Did you notice that the callback component route takes an `id` parameter? This is used to match the provider that was configured correctly.

That is, in our case we had a provider named `onadata`. This means that a URL like `example.com/callback/onadata` will work and will be matched up to the right oAuth2 provider.

A URL that does not match to a configured oAuth2 provider will result in an error.

#### Extending the oAuth2 Callback Component

The oAuth2 Callback Component takes a number of props that have defaults which you can override for custom functionality.

- **ErrorComponent**: a React component that renders a generic error message
- **HTTP404Component**: a React component that renders a 404 error message; used when a provider is not found in the configuration
- **LoadingComponent**: a React component that renders a loading message
- **SuccessfulLoginComponent**: a React component that renders a page for successful logins
- **UnSuccessfulLoginComponent**: a React component that renders a page for unsuccessful logins
- **authenticateActionCreator**: a [Redux action creator](https://redux.js.org/basics/actions#action-creators) to authenticate the user. The default that is used here is the `authenticateUser` action creator from the [session reducer package](https://github.com/onaio/js-tools/tree/master/packages/session-reducer).
- **recordResultActionCreator**: a [Redux action creator](https://redux.js.org/basics/actions#action-creators) to record the results of the authentication attempt. The default that is used is from the GateKeeper reducer (see below).
- **oAuthUserInfoGetter**: a function used to extract user information from the provider server HTTP response. The default set for this is `getOnadataUserInfo`.

### Configuring oAuth2 providers

GateKeeper works with the excellent [client-oauth2](https://github.com/mulesoft/js-client-oauth2) package.

As such, you define oAuth2 provider options similar to how you would [define options for client-oauth2](https://github.com/mulesoft/js-client-oauth2#options-global-and-method-based). You would provide all the options as required by client-oauth2 and one additional option named `userUri`.

Additionally, GateKeeper is designed to work with more than one oAuth2 provider and so the provider configuration is a list that looks like:

```ts
const providers = {
  onadata: {
    accessTokenUri:
      'https://stage-api.ona.io/o/token/' /** exactly as required for client-oauth2 */,
    authorizationUri:
      'https://stage-api.ona.io/o/authorize/' /** exactly as required for client-oauth2 */,
    clientId: 'the client id goes here' /** exactly as required for client-oauth2 */,
    redirectUri:
      'https://example.com/oauth/callback/onadata/' /** exactly as required for client-oauth2 */,
    scopes: ['read', 'write'] /** exactly as required for client-oauth2 */,
    state: 'abc' /** exactly as required for client-oauth2 */,
    userUri:
      'https://stage-api.ona.io/api/v1/user.json' /** the URL to hit so that to get back the logged in user for the provider  */
  },
  someOtherProvider: {
    accessTokenUri:
      'https://auth.example.com/o/token/' /** exactly as required for client-oauth2 */,
    authorizationUri:
      'https://auth.example.com/o/authorize/' /** exactly as required for client-oauth2 */,
    clientId: 'the client id goes here' /** exactly as required for client-oauth2 */,
    redirectUri:
      'https://example.com/oauth/callback/onadata/' /** exactly as required for client-oauth2 */,
    scopes: ['read', 'write'] /** exactly as required for client-oauth2 */,
    state: 'abc' /** exactly as required for client-oauth2 */,
    userUri:
      'https://auth.example.com/user.json' /** the URL to hit so that to get back the logged in user for the provider  */
  }
};
```

### oAuth2 helper functions

Under the hood, the components above rely on some oAuth2 helper functions to work. These are:

- **getProviderFromOptions** - creates a `ClientOAuth2` object from provider configurations
- **getOnadataUserInfo** - extracts user information for the [Ona oAuth2 provider](https://ona.io)
- **fetchUser** - fetches a user object from the oAuth2 provider server
- **oauth2Callback** - handles the HTTP call to the oAuth2 provider to get user information

These functions have been made to be very, very extensible. It would be trivial to use them to create your own Login and/or Callback components instead of the ones we provide by default.

## The Redux store

### The GateKeeper store

This is a simple [reducer module](https://github.com/erikras/ducks-modular-redux) that provides a way to store the results of authentication attempts information in the redux store.

#### The store

Currently the GateKeeper store looks like this:

```ts
/** interface to describe GateKeeper state */
export interface GateKeeperState {
  result: { [key: string]: any } /** stores the result of the auth attempt */;
  success:
    | boolean
    | null /** was it successful or not. null means authentication has not been attempted. */;
}
```

#### Action Creators

Right now, the following action creators are provided:

- `recordResult`: store the authentication attempts

##### Sample code to use these actions

```ts
import { recordResult } from '@onaio/gatekeeper';

let data; // you would need to provide a real object or leave it out

/** record the result of the authentication attempt
 * @param {boolean | null} success - whether it was successful or not. null means authentication has not been attempted.
 * @param {{ [key: string]: any }} result - an object containing result information
 */
recordResult(true, data); // example usage
```

#### Selectors

Right now, the following selectors are provided:

- `getResult`: get the result object
- `getSuccess`: returns a boolean if the authentication attempt was successful or not. Is null by default - which means authentication has not been attempted.

##### Sample code to use these selectors

```ts
import { getResult, getSuccess } from '@onaio/gatekeeper';

// we assume you have a state object defined somewhere
let state;

const authSuccess = getSuccess(state);
const authData = getResult(state);
```

#### Usage

Using this reducer is quite simple and can be done in one of two ways:

1. Use [combineReducers](https://redux.js.org/api/combinereducers) to ensure that the session reducer is loaded into your Redux store

OR

2. Register the GateKeeper reducer so that it is added to your Redux store dynamically. You would do this in the case that you are using the [Reducer Registry](https://github.com/onaio/js-tools/tree/master/packages/reducer-registry).

##### sample code to register the reducer

```ts
import gateKeeperReducer, { gateKeeperReducerName } from '@onaio/gatekeeper';
import reducerRegistry from '@onaio/redux-reducer-registry';

reducerRegistry.register(gateKeeperReducerName, gateKeeperReducer);
```

### The Session Store

GateKeeper currently works with the `session` reducer from the [session reducer package](https://github.com/onaio/js-tools/tree/master/packages/session-reducer).

We simply store the logged in user in the `session` reducer store. If you want to change this you can do one of two things:

1. provide your own `authenticateActionCreator` prop to the callback component
2. extend the `fetchUser` function that is used under the hood (this is a little more work, and should not really be necessary unless you want something drastically different)

Finally, keep in mind that this means that you need to use GateKeeper in an app in which the Redux store is already set up, and the session reducer of your choice is included.
