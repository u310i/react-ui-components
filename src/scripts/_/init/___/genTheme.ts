import { defaultTheme, deepMergeOverrideArray } from 'scripts';

export default (baseTheme) => {
	const theme = deepMergeOverrideArray(defaultTheme, baseTheme);

	theme.breakpoint.createMediaQuerie = (type, pointName) => {
		switch (type) {
			case 'maxWidth':
				return `@media (max-width: ${(theme.breakpoint.values[pointName] - 1).toString()}px)`;
			case 'minWidth':
				return `@media (min-width: ${theme.breakpoint.values[pointName].toString()}px)`;
			case 'minToMaxWidth':
				return `@media (min-width: ${theme.breakpoint.values['min'].toString()}px) and (max-width: ${(theme
					.breakpoint.values['max'] - 1).toString()}px)`;
			default:
				return 'error';
		}
	};

	const commonFontFamily = theme.typography.fontFamily.join(',');

	for (let key of Object.keys(theme.typography.font)) {
		const font = theme.typography.font[key];
		!font['fontFamily'] && (font['fontFamily'] = commonFontFamily);
	}

	return theme;
};
