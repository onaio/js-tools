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
    expect(isAuthorized(store.getState())).toBe(null);
  });
});
