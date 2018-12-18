import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { genUniqueId, createOptimizedEvent } from 'utilities/utils';

export const useDidUpdate = (fn, dependencies) => {
  const isMount = useRef(true).current;
  let cleanup;
  useEffect(() => {
    if (isMount) {
      isMount = false;
    } else {
      cleanup = fn();
    }
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, dependencies);
};

export const useAddWindowEvent = (
  type,
  callback,
  enable = true,
  optimized = true
) => {
  const refOptimized = useRef(null);
  useEffect(
    () => {
      if (enable) {
        const event = callback();
        refOptimized.current =
          (optimized && createOptimizedEvent(event)) || event;
        window.addEventListener(type, refOptimized.current);
      }
      return () => {
        if (refOptimized.current) {
          window.removeEventListener(type, refOptimized.current);
          refOptimized.current = null;
        }
      };
    },
    [enable]
  );
};

export const useAddCssInBody = (name, state, styleCallback) => {
  const uniqueId = useRef(`${name}_${genUniqueId()}`).current;
  useEffect(() => {
    const head = document.head;
    const style = `
      body.body-${uniqueId} {
        ${styleCallback()}
      }
    `;
    const styleNode = document.createElement('style');
    const cssText = document.createTextNode(style);
    styleNode.setAttribute('id', `body-${uniqueId}`);
    styleNode.appendChild(cssText);
    head.appendChild(styleNode);
    return () => {
      const removeNode = document.getElementById(`body-${uniqueId}`);
      if (removeNode) {
        head.removeChild(removeNode);
      }
    };
  }, []);

  useEffect(
    () => {
      const body = document.body;
      if (state) {
        body.classList.add(`body-${uniqueId}`);
      } else {
        body.classList.remove(`body-${uniqueId}`);
      }
      return () => {
        if (body.classList.contains(`body-${uniqueId}`)) {
          body.classList.remove(`body-${uniqueId}`);
        }
      };
    },
    [state]
  );
};

export const useSetTwoBreakpoints = (breakpoints, refBreakpoint) => {
  const { sm, lg } = breakpoints;

  const init = useMemo(() => {
    const width = window.innerWidth,
      breakpoint = (width < sm && 'sm') || (width < lg && 'lg') || 'max';
    return breakpoint;
  }, []);
  const [breakpointState, setBreakpointState] = useState(init);
  refBreakpoint.current = breakpointState;

  useEffect(() => {
    let currentWidth,
      currentBreakpoint = breakpointState,
      prevBreakpoint;
    const setBreakpointOnResize = () => {
      prevBreakpoint = currentBreakpoint;
      currentWidth = window.innerWidth;
      if (currentWidth < sm) {
        currentBreakpoint = 'sm';
      } else if (currentWidth < lg && currentWidth >= sm) {
        currentBreakpoint = 'lg';
      } else {
        currentBreakpoint = 'max';
      }

      if (currentBreakpoint !== prevBreakpoint) {
        setBreakpointState(currentBreakpoint);
      }
    };

    const windowSizeOnScroll = createOptimizedEvent(setBreakpointOnResize);

    window.addEventListener('resize', windowSizeOnScroll);
    return () => {
      window.removeEventListener('resize', windowSizeOnScroll);
    };
  }, []);
};

export const useHasFirstElement = hasElement => {
  const prevHasElementRef = useRef();
  if (!hasElement) {
    prevHasElementRef.current = null;
  }
  let hasFirstElement;

  if (hasElement && prevHasElementRef.current === null) {
    prevHasElementRef.current = true;
    hasFirstElement = true;
  } else if (!hasElement && prevHasElementRef.current === true) {
    prevHasElementRef.current = null;
    hasFirstElement = null;
  } else {
    hasFirstElement = null;
  }
  return hasFirstElement;
};
