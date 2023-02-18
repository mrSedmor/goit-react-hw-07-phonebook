const persistLocalStorage = ({ key, selector, store }) => {
  let previousState = null;

  return () => {
    const currentState = selector(store.getState());
    if (previousState === currentState) {
      return;
    }

    previousState = currentState;
    localStorage.setItem(key, JSON.stringify(currentState));
  };
};

export default persistLocalStorage;
