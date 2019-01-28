import { deepMerge } from 'utilities/utils';

export const extractCurrentScreenSizeProps = (state, options) => {
  const { xs, sm, md, lg, xl, ...common } = options;
  const max = xl || lg || md || sm || xs;
  const currentOptions =
    (state === 'xs' && deepMerge.overrideArray(common, xs)) ||
    (state === 'sm' && deepMerge.overrideArray(common, sm)) ||
    (state === 'md' && deepMerge.overrideArray(common, md)) ||
    (state === 'lg' && deepMerge.overrideArray(common, lg)) ||
    (state === 'xl' && deepMerge.overrideArray(common, xl)) ||
    (state === 'max' && deepMerge.overrideArray(common, max)) ||
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
