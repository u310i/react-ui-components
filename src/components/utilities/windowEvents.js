import { createGetScrollUpDownState } from 'utilities/utils';

export const setBreakpointOnResizeEvent = (
  breakpoints,
  initBreakpoint,
  setState
) => {
  const { xs, sm, md, lg, xl } = breakpoints;
  let currentWidth,
    prevBreakpoint,
    currentBreakpoint = initBreakpoint;

  if (sm && lg) {
    return () => {
      prevBreakpoint = currentBreakpoint;
      currentWidth = window.innerWidth;
      currentBreakpoint =
        (currentWidth < sm && 'sm') || (currentWidth < lg && 'lg') || 'max';
      if (currentBreakpoint !== prevBreakpoint) {
        setState(currentBreakpoint);
      }
    };
  } else if (sm && md && lg) {
    return () => {
      prevBreakpoint = currentBreakpoint;
      currentWidth = window.innerWidth;
      currentBreakpoint =
        (currentWidth < sm && 'sm') ||
        (currentWidth < md && 'md') ||
        (currentWidth < lg && 'lg') ||
        'max';
      if (currentBreakpoint !== prevBreakpoint) {
        setState(currentBreakpoint);
      }
    };
  } else {
    return () => {
      prevBreakpoint = currentBreakpoint;
      currentWidth = window.innerWidth;
      currentBreakpoint =
        (currentWidth < xs && 'xs') ||
        (currentWidth < sm && 'sm') ||
        (currentWidth < md && 'md') ||
        (currentWidth < lg && 'lg') ||
        (currentWidth < xl && 'xl') ||
        'max';
      if (currentBreakpoint !== prevBreakpoint) {
        setState(currentBreakpoint);
      }
    };
  }
};

export const getDisplayStateOnScrollEvent = (elRef, keepHeight, callback) => {
  const elRefExists = !!elRef.current;

  let target, height, top;
  if (keepHeight) {
    height = elRefExists ? elRef.current.offsetHeight : -1;
    top = elRefExists ? elRef.current.offsetTop : 0;
    target = height + top;
  } else {
    target = elRefExists ? elRef.current.offsetTop : 0;
  }

  let currentRow,
    initRow = window.pageYOffset,
    baseState,
    state = 'init',
    prevState;

  const getScrollState = createGetScrollUpDownState(initRow);
  return () => {
    currentRow = window.pageYOffset;
    baseState = getScrollState(currentRow);
    prevState = state;
    if (currentRow > target) {
      state = baseState !== 'down' ? 'show' : 'hide';
    } else {
      state = 'quickly-show';
    }
    if (state !== prevState) {
      callback(state);
    }
  };
};

export const getIsArrivedToElOnScrollEvent = (ref, callback) => {
  if (ref.current || ref.current.offsetTop === 0) {
    let offsetTop,
      currentRow,
      flag = false;
    return () => {
      offsetTop = ref.current.offsetTop;
      currentRow = window.pageYOffset;
      flag = currentRow > offsetTop ? true : false;
      callback(flag);
    };
  } else {
    return () => {};
  }
};

export const setSetRefsPropertyEvent = (
  setState,
  ref,
  property,
  callback = false
) => {
  if (ref.current) {
    let current;
    let prev;
    return () => {
      if (!current) {
        current = ref.current[property];
      }
      prev = current;
      current = ref.current[property];
      if (callback) {
        setState(callback(current, prev));
      } else {
        if (current !== prev) {
          setState(current);
        }
      }
    };
  } else {
    return () => {};
  }
};

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
