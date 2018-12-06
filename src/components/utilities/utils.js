export const createReactCSSTransitionStyle = (
  name,
  {
    defaultStyle,
    appear,
    appearActive,
    enter,
    enterActive,
    enterDone,
    exit,
    exitActive,
    exitDone
  }
) => {
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

export const createReactCSSTransitionCallBack = (name, node) => {
  return {
    onEnter: () => {
      node.classList.remove(`${name}-exit`);
      node.classList.remove(`${name}-exit-active`);
      node.classList.add(`${name}-enter`);
    },
    onEntering: () => {
      node.classList.add(`${name}-enter-active`);
    },
    onEntered: () => {
      node.classList.remove(`${name}-enter`);
      node.classList.remove(`${name}-enter-active`);
      node.classList.add(`${name}-enter-done`);
    },
    onExit: () => {
      node.classList.remove(`${name}-enter`);
      node.classList.remove(`${name}-enter-active`);
      node.classList.remove(`${name}-enter-done`);
      node.classList.add(`${name}-exit`);
    },
    onExiting: () => {
      node.classList.add(`${name}-exit-active`);
    },
    onExited: () => {
      node.classList.remove(`${name}-exit`);
      node.classList.remove(`${name}-exit-active`);
    }
  };
};

export const requestAnimationFrameFallback = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

export const createOptimizedEvent = callback => {
  let ticking = false;
  return () => {
    if (!ticking) {
      requestAnimationFrameFallback(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

const createGetScrollState = () => {
  let currentPosition,
    prePosition,
    state = 'equal',
    isFirstRender = true;
  return (initPosition, position) => {
    if (!isFirstRender) {
      prePosition = currentPosition;
    } else {
      prePosition = initPosition;
      isFirstRender = false;
    }
    currentPosition = position;
    if (currentPosition > prePosition) {
      if (state !== 'down') {
        state = 'down';
      }
    } else if (currentPosition < prePosition) {
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
export const getScrollState = createGetScrollState();

export const createGetStateOnScroll = (setState, elementHeight) => {
  let currentPosition,
    initPosition = window.pageYOffset,
    scrollState,
    preState,
    state,
    height = elementHeight ? elementHeight : 0;
  return () => {
    currentPosition = window.pageYOffset;
    scrollState = getScrollState(initPosition, currentPosition);
    preState = state;
    if (currentPosition > height) {
      state = scrollState !== 'down' ? 'show' : 'hide';
    } else {
      state = 'quickly-show';
    }
    if (state !== preState) {
      setState(state);
    }
  };
};
