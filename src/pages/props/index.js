import params from './params';
import commonParams from './common_params';
import baseTheme from './theme';

import genTheme from 'scripts';

const theme = genTheme(baseTheme);

const props = {
	params: params(theme, commonParams),
	theme: theme
};

export default props;
