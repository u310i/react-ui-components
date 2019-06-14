import React, { useState, useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import $ from './_constants';
import { isNumber } from 'scripts';
import { DivElement, EventListener } from '..';

const $names = $.names;
const $style = $.style;

const resetStyle = (node) => {
	node.style.position = null;
	node.style.top = null;
	node.style.bottom = null;
	node.style.left = null;
};

const addSpaceToOuter = (outerNode, stickyNode) => {
	const computedStyle = window.getComputedStyle(stickyNode);
	outerNode.style.height = computedStyle.getPropertyValue('height');
	outerNode.style.width = computedStyle.getPropertyValue('width');
};

const removeSpaceFromOuter = (outerNode) => {
	outerNode.style.height = '';
	outerNode.style.width = '';
};

const Sticky = ({
	children,
	style: propOuterStyle = {},
	innerStyle: propInnerStyle = {},
	offsetTop = 0,
	offsetBottom,
	timeout,
	absolute,
	...props
}) => {
	const [ isTop, setIsTop ] = useState(false);
	const [ isBottom, setIsBottom ] = useState(false);

	const outerRef = useRef(null);
	const innerRef = useRef(null);

	const [ canStickingTop, canStickingBottom ] = useMemo(() => {
		return [
			typeof offsetTop !== 'undefined' && isNumber(offsetTop),
			typeof offsetBottom !== 'undefined' && isNumber(offsetBottom)
		];
	}, []);

	const setStickingState = useCallback(() => {
		let topFlag = false;
		let topPrev;
		let bottomFlag = false;
		let bottomPrev;
		return () => {
			const rect = outerRef.current.getBoundingClientRect();
			if (canStickingTop) {
				topPrev = topFlag;
				topFlag = rect.top < offsetTop;
				if (topFlag !== topPrev) {
					setIsTop(topFlag);
				}
			}
			if (canStickingBottom) {
				bottomPrev = bottomFlag;
				bottomFlag = rect.bottom + offsetBottom > window.innerHeight;
				if (bottomFlag !== bottomPrev) {
					setIsBottom(bottomFlag);
				}
			}
		};
	}, []);

	useLayoutEffect(() => {
		const rect = outerRef.current.getBoundingClientRect();
		if (canStickingTop) {
			if (rect.top < offsetTop) {
				setIsTop(true);
			}
		}
		if (canStickingBottom) {
			if (rect.bottom + offsetBottom > window.innerHeight) {
				setIsBottom(true);
			}
		}
	}, []);

	useLayoutEffect(
		() => {
			if (isTop) {
				innerRef.current.style.position = 'fixed';
				innerRef.current.style.top = `${offsetTop}px`;
				innerRef.current.style.left = '0px';
				addSpaceToOuter(outerRef.current, innerRef.current);
			} else if (isBottom) {
				innerRef.current.style.position = 'fixed';
				innerRef.current.style.bottom = `${offsetBottom}px`;
				innerRef.current.style.left = '0px';
				addSpaceToOuter(outerRef.current, innerRef.current);
			} else {
				resetStyle(innerRef.current);
				removeSpaceFromOuter(outerRef.current);
			}
		},
		[ isTop, isBottom ]
	);

	const style = useMemo(
		() => {
			return {
				inner: {
					zIndex: $style.zIndex,
					...propInnerStyle
				},
				outer: {
					position: absolute ? 'absolute' : '',
					...propOuterStyle
				},
				absoluteWrapper: {
					position: 'relative'
				}
			};
		},
		[ propInnerStyle, propOuterStyle, absolute ]
	);

	const innerComponent = (
		<DivElement refer={outerRef} style={style.outer} className={$names.ucSlideOuter}>
			<DivElement refer={innerRef} style={style.inner} className={$names.ucSlideInner}>
				{typeof children === 'function' ? children(isTop, isBottom) : children}
			</DivElement>
		</DivElement>
	);

	return (
		<EventListener target={window} type="scroll" callback={setStickingState} options={{ passive: true }} {...props}>
			{absolute ? (
				<DivElement style={style.absoluteWrapper} className={$names.ucSlideAbsoluteWrapper}>
					{innerComponent}
				</DivElement>
			) : (
				innerComponent
			)}
		</EventListener>
	);
};

export default Sticky;
