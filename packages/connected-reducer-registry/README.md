# Connected Reducer Registry

This package primarily provides a "connected reducer registry".

But what does this even mean? To explain that, let us talk about the two things that this package provides:

## 1. Connected redux store

```ts
import store from '@onaio/connected-reducer-registry';
```

This is a redux store that:

- works with the Reducer Registry i.e. any reducers added to the Reducer registry will be added to the Redux store dynamically
- is integrated with [connected-react-router](https://github.com/supasate/connected-react-router)
- is integrated with [redux thunk](https://github.com/reduxjs/redux-thunk)
- includes redux dev tools for easy debugging

By default, the store that is provided includes only a router reducer.

## 2. A way to created a connected redux store

```ts
import { combine } from '@onaio/redux-reducer-registry';
import { getConnectedStore, connectReducer } from '@onaio/connected-reducer-registry';
import someReducer from 'somewhere'; // obviously change this!

/** create default reducers */
const defaultReducers = {
  router: connectReducer as any,
  anotherReducer: someReducer
};

/** Create the store */
const store = getConnectedStore(defaultReducers);

/** Set listener to add reducers to store when registered */
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});
```

## Redux modules

We highly recommend and encourage that you use [redux modules](https://github.com/erikras/ducks-modular-redux).
