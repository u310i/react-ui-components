export const screenSizeStyleMaker = (themeBreakpoints, styles) => {
  if (!themeBreakpoints || !styles) return {};
  let result = {};
  const themeBreakpointsKeys = Object.keys(themeBreakpoints.values);
  for (let [key, value] of Object.entries(styles)) {
    if (themeBreakpointsKeys.includes(key)) {
      let breakpointName = `@media (max-width: ${
        themeBreakpoints.values[key].value
      })`;
      result[breakpointName] = value;
    }
  }
  return result;
};

export const screenSizeStyleNameGen = breakpoints => {
  let result = {};
  for (let [key, value] of Object.entries(breakpoints)) {
    result[key] = `@media (max-width: ${value.value})`;
  }
  return result;
};
