const loadState = (reducerName: string) => {
  try {
    const serializedState = localStorage.getItem(reducerName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export default loadState;
