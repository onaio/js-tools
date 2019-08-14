import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { FlushThunks } from 'redux-testkit';
import thunk from 'redux-thunk';
import superset, { authorizeSuperset, isAuthorized, resetSuperset } from '..';

describe('reducers/session', () => {
  let flushThunks;
  let store: Store;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(combineReducers({ superset }), applyMiddleware(flushThunks, thunk));
    jest.resetAllMocks();
  });

  it('Should have initial state', () => {
    // Initially authorized property of state object is set to null
    expect(isAuthorized(store.getState())).toBe(null);
  });

  it('Should be able to authorize and reset', () => {
    // Initially authorized property of state object is set to null
    expect(isAuthorized(store.getState())).toBe(null);

    // Call action to set authorized property of state object to true
    store.dispatch(authorizeSuperset(true));

    // Now authorized
    expect(isAuthorized(store.getState())).toBe(true);

    // Call action to set authorized to false
    store.dispatch(authorizeSuperset(false));

    // Now not authorized
    expect(isAuthorized(store.getState())).toBe(false);

    // Call action to reset authorized property of state object to null
    store.dispatch(resetSuperset());

    // Now authorized property of state object is set to null
    expect(isAuthorized(store.getState())).toBe(null);
  });
});
