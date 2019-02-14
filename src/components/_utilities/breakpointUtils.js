import { deepMergeOverrideArray } from 'utilities/utils';

export const extractCurrentScreenSizeProps = (state, options) => {
  const { xs, sm, md, lg, xl, ...common } = options;
  const max = xl || lg || md || sm || xs;
  const currentOptions =
    (state === 'xs' && deepMergeOverrideArray(common, xs)) ||
    (state === 'sm' && deepMergeOverrideArray(common, sm)) ||
    (state === 'md' && deepMergeOverrideArray(common, md)) ||
    (state === 'lg' && deepMergeOverrideArray(common, lg)) ||
    (state === 'xl' && deepMergeOverrideArray(common, xl)) ||
    (state === 'max' && deepMergeOverrideArray(common, max)) ||
    common;
  return currentOptions;
};

export const useGetInitBreakpoint = breakpoints => {
  const { xs, sm, md, lg, xl } = breakpoints;
  const width = window.innerWidth;
  const currentBreakpoint =
    (xs && width < xs && 'xs') ||
    (sm && width < sm && 'sm') ||
    (md && width < md && 'md') ||
    (lg && width < lg && 'lg') ||
    (xl && width < xl && 'xl') ||
    'max';
  return currentBreakpoint;
};

export const getComponentByBreakpoint = (entries, breakpoint) => {
  for (let [key, component] of entries) {
    return key === breakpoint && component;
  }
};
