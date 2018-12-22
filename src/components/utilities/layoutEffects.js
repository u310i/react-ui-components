import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';

export const useSetDomProperty = (
  setState,
  ref,
  property,
  enable = true,
  clear = true,
  dependencies = []
) => {
  useLayoutEffect(() => {
    if (enable && ref.current) {
      const value = ref.current[property];
      // console.log('@@@updated set offsetTop');
      // console.warn(
      //   '-----------------------' + enable + '-----------------------'
      // );
      setState(value);
    }
    return () => {
      if (clear) {
        // console.log('@@@will update set offsetTop');

        setState(null);
      }
    };
  }, dependencies);
};

export const useGetRefsPropertyToRefs = (
  getRef,
  ref,
  property,
  enable = true,
  dependencies = []
) => {
  useEffect(() => {
    if (enable) {
      const value = ref.current[property];
      getRef.current = value;
    }
    return () => {
      if (enable) {
        getRef.current = null;
      }
    };
  }, dependencies);
};
