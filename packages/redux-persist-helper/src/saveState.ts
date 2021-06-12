const saveState = (state: any, isLoggedIn: boolean, reducerName: string) => {
  try {
    const serializedState = JSON.stringify(state);
    if (isLoggedIn) {
      localStorage.setItem(reducerName, serializedState);
    } else {
      localStorage.removeItem(reducerName);
    }
  } catch (e) {
    // console.error(e);
  }
};

export default saveState;
