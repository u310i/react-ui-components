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

export const screenSizeStyleNameGen = breakpoints => {
  let result = {};
  for (let [key, name] of Object.entries(breakpoints)) {
    result[key] = `@media (max-width: ${name.value.toString()}px)`;
  }
  return result;
};

export const createReactCSSTransitionStyle = (name, style) => {
  return {
    name: name,
    style: {
      ...(style.default || style.enter),
      [`&.${name}-appear`]: style.appear || style.enter,
      [`&.${name}-appear-active`]: style.appearActive || style.enterActive,
      [`&.${name}-enter`]: style.enter,
      [`&.${name}-enter-active`]: style.enterActive,
      [`&.${name}-enter-done`]: style.enterDone || style.exit,
      [`&.${name}-exit`]: style.exit,
      [`&.${name}-exit-active`]: style.exitActive,
      [`&.${name}-exit-done`]: style.exitDone || style.enter
    }
  };
};
