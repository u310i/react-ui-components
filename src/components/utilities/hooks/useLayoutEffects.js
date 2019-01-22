import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';

export const useGetDomProperty = (
  ref,
  property,
  callback,
  enable = true,
  dependencies = []
) => {
  useLayoutEffect(() => {
    let clear;
    if (enable && ref.current) {
      const value = ref.current[property];
      clear = callback(value);
    }
    return () => {
      if (clear) {
        clear();
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
