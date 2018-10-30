import createTheme from 'utilities/createTheme';

export default (baseTheme, baseProps) => {
  const pageTheme = createTheme(baseTheme);
  const breakpointKeys = pageTheme.breakpoints.keys;
  const pageProps = baseProps(breakpointKeys)
  return {pageProps, pageTheme};
};
