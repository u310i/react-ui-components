import createTheme from './createTheme';

export default (baseTheme, baseProps) => {
  const pageTheme = createTheme(baseTheme);
  const pageProps = baseProps(pageTheme);
  return { pageProps, pageTheme };
};
