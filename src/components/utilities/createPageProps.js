import createTheme from 'utilities/createTheme';

export default (theme, pageProps) => {
  const pageTheme = createTheme(theme);
  const breakpoints = pageTheme.breakpoints.keys;
  return pageProps(theme, breakpoints);
};
