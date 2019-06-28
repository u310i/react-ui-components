import React, { useMemo } from 'react';
import $ from './_constants';
import {} from 'scripts';
import { Fade, DivElement } from '..';

const Backdrop = ({
	children = null,
	style: propStyle = {},
	classNames: propClassNames = [],
	open = true,
	disablePointerEvents = false,
	duration,
	invisible,
	refer,
	fadeProps,
	...props
}) => {
	const style = useMemo(
		() => {
			return {
				...$.styles.main,
				...(invisible ? $.styles.invisible : {}),
				...(disablePointerEvents ? $.styles.disablePointerEvents : {}),
				...propStyle
			};
		},
		[ propStyle, invisible, disablePointerEvents ]
	);

	const classNames = useMemo(() => {
		return [ $.names.ucBackdrop, ...propClassNames ];
	}, propClassNames);

	return (
		<Fade
			in={open}
			duration={duration}
			style={$.styles.fadeComponent}
			classNames={classNames}
			aria-hidden={true}
			{...fadeProps}
		>
			<DivElement style={style} refer={refer} className={$.names.ucBackdropMain} {...props}>
				{children}
			</DivElement>
		</Fade>
	);
};

export default Backdrop;
