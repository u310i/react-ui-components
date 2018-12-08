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

const createGetScrollState = () => {
  let currentRow,
    prevRow,
    rowState = 'equal',
    isFirstRender = true;
  return (initRow, row) => {
    if (!isFirstRender) {
      prevRow = currentRow;
    } else {
      prevRow = initRow;
      isFirstRender = false;
    }
    currentRow = row;
    if (currentRow > prevRow) {
      if (rowState !== 'down') {
        rowState = 'down';
      }
    } else if (currentRow < prevRow) {
      if (rowState !== 'up') {
        rowState = 'up';
      }
    } else {
      if (rowState !== 'equal') {
        rowState = 'equal';
      }
    }

    return rowState;
  };
};
export const getScrollState = createGetScrollState();

export const createGetStateOnScroll = (setState, elementHeight) => {
  let currentRow,
    initRow = window.pageYOffset,
    scrollState,
    prevState,
    rowState = 'init',
    height = elementHeight ? elementHeight : -1;
  return () => {
    currentRow = window.pageYOffset;
    scrollState = getScrollState(initRow, currentRow);
    prevState = rowState;
    if (currentRow > height) {
      rowState = scrollState !== 'down' ? 'show' : 'hide';
    } else {
      rowState = 'quickly-show';
    }
    if (rowState !== prevState) {
      setState(rowState);
    }
  };
};
