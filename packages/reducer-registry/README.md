# Redux Reducer Registry

The reducer registry enables Redux reducers to be added to the store’s reducer after the store has been created. This allows Redux modules to be loaded on-demand, without requiring all Redux modules to be bundled in the main chunk for the store to correctly initialize.

This package was inspired by this blog post: [Redux modules and code splitting](http://nicolasgallagher.com/redux-modules-and-code-splitting/).

## Installation

```sh
yarn add @onaio/redux-reducer-registry
```

## How it works

By maintaining a registry of reducers, we are able to load any reducer dynamically as and when we need it.

### The Store

A sample registry-aware redux store with no initial state is included in this package.

```ts
import store from '@onaio/redux-reducer-registry';
```

Alternatively, you can create your own store by doing something like:

```ts
import { getStore, combine } from '@onaio/redux-reducer-registry';
import reducerRegistry from '@onaio/redux-reducer-registry';

const initialState = {
  things: ['users', 'messages'],
  x: 1
};
const newStore = getStore(reducerRegistry.getReducers(), initialState);

// don't forget to do this so that you add a reducer to store when it is registered
reducerRegistry.setChangeListener(reducers => {
  newStore.replaceReducer(combine(reducers));
});
```

### Registering Reducers

This is simply:

```ts
import reducerRegistry from 'redux-reducer-registry';
import reducer from 'some-module/reducers/users';

reducerRegistry.register('users', reducer);
```

After this the `users` reducer should now be fully loaded and ready to go.

### Redux modules

We highly recommend and encourage that you use [redux modules](https://github.com/erikras/ducks-modular-redux).
