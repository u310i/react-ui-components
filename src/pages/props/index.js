import material from './material';
import common from './common';
import baseTheme from './theme';

import genTheme from 'utilities/initPageUtils/genTheme';

const props = {
  material: material(theme, common),
  theme: genTheme(baseTheme)
};

export default props;
