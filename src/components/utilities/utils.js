export const genUniqueId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export const genReactCSSTransitionStyle = (name, fn) => {
  const {
    defaultStyle,
    appear,
    appearActive,
    enter,
    enterActive,
    enterDone,
    exit,
    exitActive,
    exitDone
  } = fn();

  return {
    ...(defaultStyle || {}),
    [`&.${name}-appear`]: appear || enter,
    [`&.${name}-appear-active`]: appearActive || enterActive,
    [`&.${name}-enter`]: enter,
    [`&.${name}-enter-active`]: enterActive,
    [`&.${name}-enter-done`]: enterDone || exit,
    [`&.${name}-exit`]: exit,
    [`&.${name}-exit-active`]: exitActive,
    [`&.${name}-exit-done`]: exitDone || enter
  };
};

// export const createReactCSSTransitionCallBack = (name, node) => {
//   return {
//     onEnter: () => {
//       node.classList.remove(`${name}-exit`);
//       node.classList.remove(`${name}-exit-active`);
//       node.classList.add(`${name}-enter`);
//     },
//     onEntering: () => {
//       node.classList.add(`${name}-enter-active`);
//     },
//     onEntered: () => {
//       node.classList.remove(`${name}-enter`);
//       node.classList.remove(`${name}-enter-active`);
//       node.classList.add(`${name}-enter-done`);
//     },
//     onExit: () => {
//       node.classList.remove(`${name}-enter`);
//       node.classList.remove(`${name}-enter-active`);
//       node.classList.remove(`${name}-enter-done`);
//       node.classList.add(`${name}-exit`);
//     },
//     onExiting: () => {
//       node.classList.add(`${name}-exit-active`);
//     },
//     onExited: () => {
//       node.classList.remove(`${name}-exit`);
//       node.classList.remove(`${name}-exit-active`);
//     }
//   };
// };

export const requestAnimationFrameFallback = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(fn) {
      window.setTimeout(fn, 1000 / 60);
    }
  );
})();

export const createOptimizedEvent = fn => {
  let ticking = false;
  return () => {
    if (!ticking) {
      requestAnimationFrameFallback(() => {
        fn();
        ticking = false;
      });
      ticking = true;
    }
  };
};

const createGetScrollUpDownState = initRow => {
  let currentRow,
    prevRow,
    state = 'equal',
    isFirstRender = true;
  return row => {
    if (isFirstRender) {
      prevRow = initRow;
      isFirstRender = false;
    } else {
      prevRow = currentRow;
    }
    currentRow = row;
    if (currentRow > prevRow) {
      if (state !== 'down') {
        state = 'down';
      }
    } else if (currentRow < prevRow) {
      if (state !== 'up') {
        state = 'up';
      }
    } else {
      if (state !== 'equal') {
        state = 'equal';
      }
    }

    return state;
  };
};

export const createSetDisplayStateOnScroll = (setState, elRef, keepHeight) => {
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
      setState(state);
    }
  };
};

export const createSetArrivedStateOnScroll = (setState, elRef) => {
  const elRefExists = !!elRef.current;
  const top = elRefExists ? elRef.current.offsetTop : 0;
  let currentRow,
    flag = false,
    prevFlag = false;
  if (window.pageYOffset > top) {
    flag = true;
    prevFlag = flag;
    setState(flag);
  }

  return () => {
    currentRow = window.pageYOffset;
    prevFlag = flag;
    if (currentRow > top) {
      flag = true;
    } else {
      flag = false;
    }
    if (flag !== prevFlag) {
      setState(flag);
    }
  };
};

export const extractCurrentScreenSizeProps = (state, options) => {
  const { xs = {}, sm = {}, md = {}, lg = {}, xl = {}, ...common } = options;
  const currentOptions = (state === 'xs' && { ...common, ...xs }) ||
    (state === 'sm' && { ...common, ...sm }) ||
    (state === 'md' && { ...common, ...md }) ||
    (state === 'lg' && { ...common, ...lg }) ||
    (state === 'xl' && { ...common, ...xl }) || { ...common };
  return currentOptions;
};

export const extractOverlapObjectProperty = (
  first,
  second,
  extractFromFirst
) => {
  const result = {};
  const extractObj = extractFromFirst ? first : second;
  Object.keys(first).forEach(value => {
    if (second[value]) {
      result[value] = extractObj[value];
    }
  });
  return result;
};

export const camelCaceToAny = (camel, insert = '_') => {
  return camel.replace(/([A-Z])/g, s => {
    return insert + s.charAt(0).toLowerCase();
  });
};

export const makeTransitionProperty = style => {
  return Object.keys(style)
    .map(value => {
      return camelCaceToAny(value, '-');
    })
    .join();
};
