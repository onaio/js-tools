# session reducer

This is a simple [reducer module](https://github.com/erikras/ducks-modular-redux) that provides a way to store session-type information in the redux store.

## The store

Currently the session store looks like this:

```ts
/** simple user object description of fields */
export interface User {
  email?: string;
  gravatar?: string;
  name: string;
  username: string;
}

/** the session store fields description */
export interface SessionState {
  extraData?: { [key: string]: any } /** an object that can hold anything, which is optional */;
  authenticated: boolean /** boolean to check if user is authenticated */;
  user: User /** a simple user object */;
}
```

## Action Creators

Right now, the following action creators are provided:

- `authenticateUser`: for logging in a new user
- `logOutUser`: for logging out a logged in user

### Sample code to use these actions

```ts
import { authenticateUser, logOutUser } from '@onaio/session-reducer';

let sessionUser; // you would need to provide a real user object
let onadataUser; // you would need to provide a real object or leave it out

/** authenticate user action creator expects the following params
 * @param {boolean} authenticated - whether the user is authenticated or not
 * @param {User} user - the user object
 * @param {{ [key: string]: any }} extraData - an object containing any extra information
 */
authenticateUser(true, sessionUser, onadataUser); // example usage

/** logOutUser takes no params */
logOutUser(); // example usage
```

## Usage

Using this reducer is quite simple and can be done in one of two ways:

1. Use [combineReducers](https://redux.js.org/api/combinereducers) to ensure that the session reducer is loaded into your Redux store

OR

2. Register the session reducer so that it is added to your Redux store dynamically. You would do this in the case that you are using the [Reducer Registry](https://github.com/onaio/js-tools/tree/master/packages/reducer-registry).
