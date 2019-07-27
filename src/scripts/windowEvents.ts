// export const setBreakpointOnResizeEvent = (
//   breakpoints,
//   initBreakpoint,
//   setState
// ) => {
//   const { xs, sm, md, lg, xl } = breakpoints;
//   let currentWidth,
//     prevBreakpoint,
//     currentBreakpoint = initBreakpoint;

//   if (md && !(xs && sm && lg && xl)) {
//     return () => {
//       prevBreakpoint = currentBreakpoint;
//       currentWidth = window.innerWidth;
//       currentBreakpoint = (currentWidth < md && 'md') || 'max';
//       if (currentBreakpoint !== prevBreakpoint) {
//         setState(currentBreakpoint);
//       }
//     };
//   } else if (sm && lg && !(xs && md && xl)) {
//     return () => {
//       prevBreakpoint = currentBreakpoint;
//       currentWidth = window.innerWidth;
//       currentBreakpoint =
//         (currentWidth < sm && 'sm') || (currentWidth < lg && 'lg') || 'max';
//       if (currentBreakpoint !== prevBreakpoint) {
//         setState(currentBreakpoint);
//       }
//     };
//   } else if (sm && md && lg && !(xs && xl)) {
//     return () => {
//       prevBreakpoint = currentBreakpoint;
//       currentWidth = window.innerWidth;
//       currentBreakpoint =
//         (currentWidth < sm && 'sm') ||
//         (currentWidth < md && 'md') ||
//         (currentWidth < lg && 'lg') ||
//         'max';
//       if (currentBreakpoint !== prevBreakpoint) {
//         setState(currentBreakpoint);
//       }
//     };
//   } else if (sm && md && lg && xl && !xs) {
//     return () => {
//       prevBreakpoint = currentBreakpoint;
//       currentWidth = window.innerWidth;
//       currentBreakpoint =
//         (currentWidth < sm && 'sm') ||
//         (currentWidth < md && 'md') ||
//         (currentWidth < lg && 'lg') ||
//         (currentWidth < xl && 'xl') ||
//         'max';
//       if (currentBreakpoint !== prevBreakpoint) {
//         setState(currentBreakpoint);
//       }
//     };
//   } else if (xs && sm && md && lg && xl) {
//     return () => {
//       prevBreakpoint = currentBreakpoint;
//       currentWidth = window.innerWidth;
//       currentBreakpoint =
//         (currentWidth < xs && 'xs') ||
//         (currentWidth < sm && 'sm') ||
//         (currentWidth < md && 'md') ||
//         (currentWidth < lg && 'lg') ||
//         (currentWidth < xl && 'xl') ||
//         'max';
//       if (currentBreakpoint !== prevBreakpoint) {
//         setState(currentBreakpoint);
//       }
//     };
//   }
// };

// export const getDomPropertyEvent = (elRef, propertyName, callback, init) => {
//   let value = (init || init === 0) && init,
//     preTop;
//   return () => {
//     preTop = value;
//     value = elRef.current[propertyName];
//     if (value !== preTop) {
//       callback(value);
//     }
//   };
// };

// const createGetScrollUpDownState = initRow => {
//   let currentRow,
//     prevRow,
//     state = 'equal',
//     isFirstRender = true;
//   return row => {
//     if (isFirstRender) {
//       prevRow = initRow;
//       isFirstRender = false;
//     } else {
//       prevRow = currentRow;
//     }
//     currentRow = row;
//     if (currentRow > prevRow) {
//       if (state !== 'down') {
//         state = 'down';
//       }
//     } else if (currentRow < prevRow) {
//       if (state !== 'up') {
//         state = 'up';
//       }
//     } else {
//       if (state !== 'equal') {
//         state = 'equal';
//       }
//     }

//     return state;
//   };
// };

// export const getDisplayStateOnScrollEvent = (height, callback) => {
//   let currentRow,
//     initRow = window.pageYOffset,
//     rowState,
//     state = 'init',
//     prevState = state,
//     ticking = false;

//   const judge = (state, prev) => {
//     switch (state) {
//       case 'up':
//         return 'show';
//       case 'down':
//         return 'hide';
//       default:
//         return prev;
//     }
//   };
//   const getScrollState = createGetScrollUpDownState(initRow);
//   return () => {
//     if (!ticking) {
//       currentRow = window.pageYOffset;
//       rowState = getScrollState(currentRow);
//       prevState = state;
//       if (height || height === 0) {
//         if (currentRow > height) {
//           state = judge(rowState, prevState);
//         } else {
//           state = 'ignore';
//         }
//       } else {
//         state = judge(rowState, prevState);
//       }

//       if (state !== prevState) {
//         window.setTimeout(() => {
//           ticking = false;
//         }, 10);
//         ticking = true;
//         callback(state);
//       }
//     }
//   };
// };

// export const getIsArrivedToElOnScrollEvent = (ref, callback) => {
//   let limit,
//     currentRow,
//     flag = false,
//     prev;
//   return () => {
//     limit = ref.current.offsetTop;
//     currentRow = window.pageYOffset;
//     prev = flag;
//     flag = currentRow > limit;
//     if (flag !== prev) {
//       callback(flag);
//     }
//   };
// };

// export const setSetRefsPropertyEvent = (
//   setState,
//   ref,
//   property,
//   callback = false
// ) => {
//   if (ref.current) {
//     let current;
//     let prev;
//     return () => {
//       if (!current) {
//         current = ref.current[property];
//       }
//       prev = current;
//       current = ref.current[property];
//       if (callback) {
//         setState(callback(current, prev));
//       } else {
//         if (current !== prev) {
//           setState(current);
//         }
//       }
//     };
//   } else {
//     return () => {};
//   }
// };

// export const callbackOnChangeBodyPropertyEvent = (callback, property) => {
//   let current = document.body[property];
//   let prev;
//   return () => {
//     prev = current;
//     current = document.body[property];
//     console.log(current);
//     if (current !== prev) {
//       // console.log('!!!change body');
//       callback();
//     }
//   };
// };
