import { useState, useEffect, useRef } from 'react';
import { createOptimizedEvent, createGetStateOnScroll } from 'utilities/utils';

export const useDidUpdate = callback => {
  const isMount = useRef(true);
  let endAction;
  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
    } else {
      endAction = callback();
    }
    return () => {
      if (endAction) {
        endAction();
      }
    };
  });
};

export const useGetStateOnScroll = elementId => {
  const [state, setState] = useState('show');
  useEffect(() => {
    const elementHeight = elementId
      ? document.getElementById(elementId).offsetHeight
      : false;
    const getStateOnScrol = createGetStateOnScroll(setState, elementHeight);
    const hideHeaderOnScroll = createOptimizedEvent(getStateOnScrol);
    window.addEventListener('scroll', hideHeaderOnScroll);
    return () => {
      window.removeEventListener('scroll', hideHeaderOnScroll);
    };
  }, []);
  return state;
};

export const useAddCssInBody = (name, state, styleCallback) => {
  useEffect(() => {
    const head = document.head;
    const style = `
      body.body-${name} {
        ${styleCallback()}
      }
    `;
    const styleNode = document.createElement('style');
    const cssText = document.createTextNode(style);
    styleNode.setAttribute('id', `body-${name}`);
    styleNode.appendChild(cssText);
    head.appendChild(styleNode);
    return () => {
      const removeNode = document.getElementById(`body-${name}`);
      if (removeNode) {
        head.removeChild(removeNode);
      }
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    if (state) {
      body.classList.add(`body-${name}`);
    } else {
      body.classList.remove(`body-${name}`);
    }
    return () => {
      if (body.classList.contains(`body-${name}`)) {
        body.classList.remove(`body-${name}`);
      }
    };
  });
};
