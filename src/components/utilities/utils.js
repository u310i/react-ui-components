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

export const createGetScrollUpDownState = () => {
  let currentPosition,
    prePosition = window.pageYOffset,
    state = 'equal';
  return () => {
    currentPosition = window.pageYOffset;
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
    prePosition = currentPosition;
    return state;
  };
};
