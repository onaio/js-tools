import loadState from '../loadState';

const state = {
  LAYERS: {
    groups: {},
    layers: []
  }
};

describe('loadState', () => {
  it('loads existing reducer from localstorage ', () => {
    const reducerName = 'ADD_LAYERS';
    const serializedState = JSON.stringify(state);
    localStorage.setItem(reducerName, serializedState);
    expect(loadState(reducerName)).toEqual(JSON.parse(serializedState));
  });
  it('returns undefined if state isnt in localstorage', () => {
    const reducerName = 'ADD_LAYERS';
    const serializedState = JSON.stringify(state);
    localStorage.setItem(reducerName, serializedState);
    expect(loadState('ANOTHER_REDUCER')).toBeUndefined();
  });
});
