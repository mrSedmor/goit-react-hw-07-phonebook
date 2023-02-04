import { useState, useEffect } from 'react';

function getState(key, defaultState) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultState;
  } catch {
    return defaultState;
  }
}

export default function useLocalStorage(key, defaultState) {
  const [state, setState] = useState(() => getState(key, defaultState));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
