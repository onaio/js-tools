import loadState from '../loadState';
describe('loadState', () => {
  it('loads existing reducer from localstorage ', () => {
    const reducerName = 'ADD_LAYERS';
    const state = {
      LAYERS: {
        groups: {},
        layers: []
      }
    };
    const serializedState = JSON.stringify(state);
    localStorage.setItem(reducerName, serializedState);
    expect(loadState(reducerName)).toEqual(JSON.parse(serializedState));
  });
});
