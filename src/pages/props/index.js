import params from './params';
import common from './common';
import baseTheme from './theme';

import genTheme from 'scripts';

const theme = genTheme(baseTheme);

const props = {
  params: params(theme, common),
  theme: theme
};

export default props;
