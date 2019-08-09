# superset reducer

This is a [reducer module](https://github.com/erikras/ducks-modular-redux) that helps handle superset information in the redux store

## The store

the store, currently, looks like this

```typescript
/** interface for Superset state */
interface SupersetState {
  authorized: boolean | null;
}
```

## Action creators

The following action creators are provided:

- `authorizeSuperset`: set authorized property of state object to a boolean value(true or false)
- `resetSuperset`: reset the authorized property of the state object to null

### Sample code to use these selectors

```
import { authorizeSuperset, resetSuperset } from '@onaio/superset-reducer';

/**  authorizeSuperset action creator expects the following argument
 * @param {boolean} authorizedOrNot - whether the superset is authorized or not
 */
authorizeSuperset(authorizedOrNot);//example usage

/** resetSuperset takes no params */
resetSuperset()//example usage
```

## Selectors

The following selector is provided:

- `isAuthorized`: check if superset is authorized

### Sample code to use selectors

```
import { isAuthorized } from '@onaio/superset-reducer';

// we assume you have a state object defined somewhere
let state;

const authorized = isAuthorized(state);
```

## Usage

Using this reducer is quite simple and can be done in one of two ways:

1. Use [combineReducers](https://redux.js.org/api/combinereducers) to ensure that the superset reducer is loaded into your Redux store

OR

1. Register the superset reducer so that it is added to your Redux store dynamically. You would do this in the case that you are using the [Reducer Registry](https://github.com/onaio/js-tools/tree/master/packages/reducer-registry).

### sample code to register the reducer

```typescript
import supersetReducer, { reducerName as supersetReducerName } from '@onaio/session-reducer';
import reducerRegistry from '@onaio/redux-reducer-registry';

// /** register the superset reducer */
reducerRegistry.register(supersetReducerName, supersetReducer);
```
