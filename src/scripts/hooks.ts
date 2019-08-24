import React from 'react';
import {
  genUniqueId,
  createOptimizedEvent,
  testPassiveEventSupport,
  addEventListener,
} from '.';

// export const useSetBreakpoint = (breakpoints) => {
// 	const initValue = React.useMemo(() => {
// 		return useGetInitBreakpoint(breakpoints);
// 	}, []);
// 	const [ state, setState ] = React.useState(initValue);
// 	useAddWindowEvent('resize', () => setBreakpointOnResizeEvent(breakpoints, initValue, setState), true, []);
// 	return state;
// };

export const useForceUpdate = (() => React.useState()[1]) as () => () => void;

export const useLateUpdate = (timeout: number) => {
  const [lateUpdateStatus, update] = React.useState(0);
  const timeoutId = React.useRef<null | number>(null);

  const lateUpdate = React.useCallback(() => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => {
      update(0);
      timeoutId.current = null;
    }, timeout);
    update(prev => {
      return !prev || prev === 2 ? 1 : 2;
    });
  }, [timeout]);

  React.useEffect(() => {
    return () => {
      timeoutId.current && clearTimeout(timeoutId.current);
    };
  });

  return [lateUpdateStatus, lateUpdate];
};

export const useAddWindowEvent = (
  type,
  callback,
  // options = {},
  enable = true,
  dependencies = [],
  optimized = true
) => {
  let handle;
  const rafHandleRef = React.useRef(null);
  React.useEffect(() => {
    if (enable) {
      const event = callback();
      handle =
        (optimized && createOptimizedEvent(event, rafHandleRef)) || event;
      window.addEventListener(type, handle);
      // window.addEventListener(
      //   type,
      //   handle,
      //   passiveSupported ? options : options.capture ? true : false
      // );
    }
    return () => {
      if (enable) {
        window.removeEventListener(type, handle);
        rafHandleRef.current && rafHandleRef.current();
      }
    };
  }, dependencies);
};

export const useAddCssInBody = (name, state, styleCallback) => {
  const uniqueId = React.useRef(`${name}_${genUniqueId()}`);
  React.useEffect(() => {
    const head = document.head;
    const style = `
      body.body-${uniqueId.current} {
        ${styleCallback()}
      }
    `;
    const styleNode = document.createElement('style');
    const cssText = document.createTextNode(style);
    styleNode.setAttribute('id', `body-${uniqueId.current}`);
    styleNode.appendChild(cssText);
    head.prepend(styleNode);
    return () => {
      const removeNode = document.getElementById(`body-${uniqueId.current}`);
      if (removeNode) {
        removeNode.remove();
      }
    };
  }, []);

  React.useEffect(() => {
    const body = document.body;
    if (state) {
      body.classList.add(`body-${uniqueId.current}`);
    } else {
      body.classList.remove(`body-${uniqueId.current}`);
    }
    return () => {
      body.classList.remove(`body-${uniqueId.current}`);
    };
  }, [state]);
};

const globalState = {};

const init = (name, initialState) => {
  const [state, setState] = React.useState(initialState);
  globalState[name] = [state, setState];
};

const set = (name, value) => {
  if (globalState[name]) {
    const setState = globalState[name][1];
    if (typeof value === 'function') {
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
  get,
};

export const useGetDomProperty = (
  ref,
  propertyName,
  callback,
  enable,
  dependencies = []
) => {
  const [state, setState] = React.useState(false);
  React.useLayoutEffect(() => {
    if (enable) {
      setState(prev => callback(prev, ref.current[propertyName]));
    }
  }, dependencies);
  return state;
};

export const useGetDomProperties = (
  ref,
  propertyNameList,
  callback,
  enable,
  dependencies = []
) => {
  const [state, setState] = React.useState(false);
  React.useLayoutEffect(() => {
    if (enable) {
      const value = {};
      for (let name of propertyNameList) {
        value[name] = ref.current[name];
      }
      setState(prev => callback(prev, value));
    }
  }, dependencies);
  return state;
};
