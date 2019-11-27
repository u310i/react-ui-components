import React, { createContext } from 'react';
import { css, injectGlobal, sheet } from 'react-emotion';
import rebootStyle from 'utilities/rebootStyle';
import { useSetBreakpoint } from 'utilities/hooks/useHooks';
import { getComponentByBreakpoint } from 'utilities/breakpointUtils';
import { params, theme } from './props';
import { A001 } from 'components/_Tmemplates';

// injectGlobal(params.global.props.style, rebootStyle);

const ThemeContext = createContext(theme);

export default () => {
  const breakpoint = useSetBreakpoint(theme.breakpoint.values);

  const currentParams = params[breakpoint];

  const Component = getComponentByBreakpoint(
    [['sm', <A001 key={breakpoint} {...currentParams} />]],
    breakpoint
  );

  return <ThemeContext.Provider>{Component}</ThemeContext.Provider>;
};
