import React, { useMemo } from 'react';
import $ from './_constants';
import {} from 'scripts';
import { Fade, DivElement } from '..';

const Backdrop = ({
	children = null,
	style: propStyle = {},
	classNames: propClassNames = [],
	open = true,
	duration,
	invisible,
	refer,
	...props
}) => {
	const style = useMemo(() => {
		return {
			...$.styles.main,
			...(invisible ? $.styles.invisible : {}),
			...propStyle
		};
	}, []);

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
			{...props}
		>
			<DivElement style={style} refer={refer} className={$.names.ucBackdropMain}>
				{children}
			</DivElement>
		</Fade>
	);
};

export default Backdrop;
