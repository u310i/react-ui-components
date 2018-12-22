import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';
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
  dependencies = [],
  optimized = true
) => {
  const refOptimized = useRef(null);
  useEffect(() => {
    if (enable) {
      const event = callback();
      refOptimized.current =
        (optimized && createOptimizedEvent(event)) || event;
      window.addEventListener(type, refOptimized.current);
      console.log('---updated add event:   ' + callback);
    }
    return () => {
      if (enable) {
        console.log('---will update add event:   ' + callback);
        window.removeEventListener(type, refOptimized.current);
        refOptimized.current = null;
      }
    };
  }, dependencies);
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
