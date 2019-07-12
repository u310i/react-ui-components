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
	innerProps = {},
	outerProps = {},
	absoluteWrapperProps = {},
	offsetTop = 0,
	offsetBottom,
	timeout,
	enableAbsolute = null
}) => {
	const [ isTop, setIsTop ] = useState(false);
	const [ isBottom, setIsBottom ] = useState(false);

	const _outerRef_ = useRef(null);
	const _innerRef_ = useRef(null);

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
			const rect = _outerRef_.current.getBoundingClientRect();
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
		const rect = _outerRef_.current.getBoundingClientRect();
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
				_innerRef_.current.style.position = 'fixed';
				_innerRef_.current.style.top = `${offsetTop}px`;
				_innerRef_.current.style.left = '0px';
				addSpaceToOuter(_outerRef_.current, _innerRef_.current);
			} else if (isBottom) {
				_innerRef_.current.style.position = 'fixed';
				_innerRef_.current.style.bottom = `${offsetBottom}px`;
				_innerRef_.current.style.left = '0px';
				addSpaceToOuter(_outerRef_.current, _innerRef_.current);
			} else {
				resetStyle(_innerRef_.current);
				removeSpaceFromOuter(_outerRef_.current);
			}
		},
		[ isTop, isBottom ]
	);

	const _styles_ = useMemo(
		() => {
			return {
				inner: {
					zIndex: $style.zIndex
				},
				outer: {
					position: enableAbsolute ? 'absolute' : ''
				},
				absoluteWrapper: {
					position: 'relative'
				}
			};
		},
		[ enableAbsolute ]
	);

	const innerComponent = (
		<DivElement _refer_={_outerRef_} _style_={_styles_.outer} _className_={$names.ucSlideOuter} {...outerProps}>
			<DivElement _refer_={_innerRef_} _style_={_styles_.inner} _className_={$names.ucSlideInner} {...innerProps}>
				{typeof children === 'function' ? children(isTop, isBottom) : children}
			</DivElement>
		</DivElement>
	);

	return (
		<EventListener target={window} type="scroll" callback={setStickingState} options={{ passive: true }}>
			{enableAbsolute ? (
				<DivElement
					_style_={_styles_.absoluteWrapper}
					_className_={$names.ucSlideAbsoluteWrapper}
					{...absoluteWrapperProps}
				>
					{innerComponent}
				</DivElement>
			) : (
				innerComponent
			)}
		</EventListener>
	);
};

export default Sticky;
