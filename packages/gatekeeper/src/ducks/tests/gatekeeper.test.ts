import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { FlushThunks } from 'redux-testkit';
import thunk from 'redux-thunk';
import gatekeeper, { getResult, getSuccess, recordResult } from '../gatekeeper';

describe('ducks/gatekeeper', () => {
  let flushThunks;
  let store: Store;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(combineReducers({ gatekeeper }), applyMiddleware(flushThunks, thunk));
    jest.resetAllMocks();
  });

  it('should have initial state', () => {
    // unkown success initially
    expect(getSuccess(store.getState())).toBe(null);
    // initially result
    expect(getResult(store.getState())).toEqual({});
  });

  it('should record information', () => {
    // unkown success initially
    expect(getSuccess(store.getState())).toBe(null);
    // initially result
    expect(getResult(store.getState())).toEqual({});

    // call action to record success
    store.dispatch(recordResult(true, { foo: 'bar' }));

    // success is true
    expect(getSuccess(store.getState())).toBe(true);
    // result is what we expect
    expect(getResult(store.getState())).toEqual({ foo: 'bar' });

    // call action to record failure
    store.dispatch(recordResult(false, { bar: 'foo' }));

    // success is false
    expect(getSuccess(store.getState())).toBe(false);
    // result is what we expect
    expect(getResult(store.getState())).toEqual({ bar: 'foo' });
  });
});
