import { useState } from 'react';
import { isFunction } from 'scripts';

const globalState = {};

const init = (name, initialState) => {
  const [state, setState] = useState(initialState);
  globalState[name] = [state, setState];
};

const set = (name, value) => {
  if (globalState[name]) {
    const setState = globalState[name][1];
    if (isFunction(value)) {
      setState(prev => value(prev));
    } else {
      setState(value);
    }
  }
};

const get = name => {
  if (globalState[name]) {
    return globalState[name][0];
  }
};

export const useGlobalState = {
  init,
  set,
  get
};
