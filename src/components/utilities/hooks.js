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
