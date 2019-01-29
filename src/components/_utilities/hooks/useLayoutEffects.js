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
  propertyName,
  callback,
  enable,
  dependencies = []
) => {
  const [state, setState] = useState(false);
  useLayoutEffect(() => {
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
  const [state, setState] = useState(false);
  useLayoutEffect(() => {
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
