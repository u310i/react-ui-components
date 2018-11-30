export const screenSizeStyleMaker = (themeBreakpoints, styles) => {
  if (!themeBreakpoints || !styles) return {};
  let result = {};
  const themeBreakpointsKeys = Object.keys(themeBreakpoints.values);
  for (let [key, value] of Object.entries(styles)) {
    if (themeBreakpointsKeys.includes(key)) {
      let breakpointName = `@media (max-width: ${themeBreakpoints.values[
        key
      ].value.toString()}px)`;
      result[breakpointName] = value;
    }
  }
  return result;
};

export const screenSizeMediaQueriesGen = breakpointsEntriesList => {
  let list = breakpointsEntriesList;
  let result = {};
  let length = list.length;

  list.forEach(([key, value]) => {
    result[key] = `@media (max-width: ${(value - 1).toString()}px)`;

    result[key + '_to_infinite'] = `@media (min-width: ${value.toString()}px)`;

    if (key !== list[length - 1][0]) {
      list.forEach(([inner_key, inner_value]) => {
        if (inner_key !== key && inner_value > value) {
          result[
            key + '_to_' + inner_key
          ] = `@media (min-width: ${value.toString()}px) and (max-width: ${(
            inner_value - 1
          ).toString()}px)`;
        }
      });
    }
  });

  return result;
};

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
    ...(defaultStyle || enter),
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
