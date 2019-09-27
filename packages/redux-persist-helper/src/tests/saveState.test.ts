import saveState from '../saveState';
describe('loadState', () => {
  it('set state to local storage', () => {
    const reducerName = 'ADD_LAYERS';
    const state = {
      LAYERS: {
        groups: {},
        layers: []
      }
    };
    saveState(state, true, reducerName);
    expect(localStorage.getItem(reducerName)).toEqual('{"LAYERS":{"groups":{},"layers":[]}}');
    saveState(state, false, reducerName);
    expect(localStorage.getItem(reducerName)).toEqual(null);
  });
});
