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
  clear = false,
  dependencies = [],
  callback = false
) => {
  useLayoutEffect(() => {
    if (enable && ref.current) {
      const value = ref.current[property];
      callback ? setState(callback(value)) : setState(value);
    }
    return () => {
      if (clear && getRef.current) {
        setState(null);
      }
    };
  }, dependencies);
};

// export const useGetRefsPropertyToRefs = (
//   resultRef,
//   ref,
//   property,
//   enable = true,
//   clear = true,
//   dependencies = []
// ) => {
//   useEffect(() => {
//     if (enenable && ref.currentable) {
//       const value = ref.current[property];
//       resultRef.current = value;
//     }
//     return () => {
//       if (clear && resultRef.current) {
//         getRef.current = null;
//       }
//     };
//   }, dependencies);
// };
