import React, { useLayoutEffect, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import $ from './_constants';
import { getElementRef, setTransition, setTransform, genTransitionProp, genDurations, genEasings } from 'scripts';
import { isHorizontal, getSlideDirections } from '../Drawer/Drawer';
import SwipeArea from './SwipeArea';
import { Drawer } from '..';

const $names = $.names;
const $styles = $.styles;

// This value is closed to what browsers are using internally to
// trigger a native scroll.
const UNCERTAINTY_THRESHOLD = 3; // px

// We can only have one node at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.
let nodeThatClaimedTheSwipe = null;

// Exported for test purposes.
export const reset = () => {
	nodeThatClaimedTheSwipe = null;
};

const calculateCurrentX = (anchor, touches) => {
	return anchor === 'right' ? document.body.offsetWidth - touches[0].pageX : touches[0].pageX;
};

const calculateCurrentY = (anchor, touches) => {
	return anchor === 'bottom' ? window.innerHeight - touches[0].clientY : touches[0].clientY;
};

const getMaxTranslate = (horizontalSwipe, transitionInstance) => {
	return horizontalSwipe ? transitionInstance.clientWidth : transitionInstance.clientHeight;
};

const getTranslate = (currentTranslate, startLocation, open, maxTranslate) => {
	return Math.min(
		Math.max(open ? startLocation - currentTranslate : maxTranslate + startLocation - currentTranslate, 0),
		maxTranslate
	);
};

const disableSwipeToOpenDefault = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const SwipeableDrawer = ({
	onOpen,
	onClose,
	children,
	open,
	onEscapeKeyDown,
	onOutsideClick,
	keepMount = true,
	hysteresis = 0.55,
	minFlingVelocity = 400,
	anchor = 'left',
	disableBackdropTransition = false,
	disableDiscovery = false,
	disableSwipeToOpen = disableSwipeToOpenDefault,
	hideBackdrop,
	modalProps: propModalProps = {},
	transitionProps: propTransitionProps = {},
	innerProps: propInnerProps = {},
	swipeAreaProps = {},
	swipeAreaWidth = 20,
	...props
}) => {
	const [ maybeSwiping, setMaybeSwiping ] = useState(false);
	const swipeInstance = useRef({
		isSwiping: null
	});
	const swipeAreaRef = useRef();
	const backdropTransitionRef = useRef();
	const transitionRef = useRef();

	const touchDetected = useRef(false);
	const openRef = useRef(open);

	const closedLocation = useRef(null);

	const [ durations, easings ] = useMemo(
		() => {
			return [
				genDurations(propTransitionProps.duration || $styles.duration),
				genEasings(propTransitionProps.easing || $styles.easing)
			];
		},
		[ propTransitionProps.duration, propTransitionProps.easing ]
	);

	// Use a ref so the open value used is always up to date inside useCallback.
	useLayoutEffect(
		() => {
			openRef.current = open;
		},
		[ open ]
	);

	const setPosition = useCallback(
		(translate, options = {}) => {
			const { mode = null, changeTransition = true } = options;
			const translateMultiplier = [ 'right', 'bottom' ].indexOf(anchor) !== -1 ? 1 : -1;
			const horizontalSwipe = isHorizontal(anchor);

			const transform = horizontalSwipe
				? `translate(${translateMultiplier * translate}px, 0)`
				: `translate(0, ${translateMultiplier * translate}px)`;
			setTransform(transitionRef.current, transform);

			let transition = '';

			if (mode) {
				transition = genTransitionProp([ [ 'all', durations[mode], easings[mode] ] ]);
			}

			if (changeTransition) {
				setTransition(transitionRef.current, transition);
			}

			if (!disableBackdropTransition && !hideBackdrop) {
				const backdropNode = backdropTransitionRef.current;
				backdropNode.style.opacity = 1 - translate / getMaxTranslate(horizontalSwipe, transitionRef.current);

				if (changeTransition) {
					setTransition(backdropNode, transition);
				}
			}
		},
		[ anchor, disableBackdropTransition, hideBackdrop, propTransitionProps, durations, easings ]
	);

	const handleBodyTouchEnd = useCallback(
		(event) => {
			if (!touchDetected.current) {
				closedLocation.current = null;
				return;
			}
			nodeThatClaimedTheSwipe = null;
			touchDetected.current = false;
			setMaybeSwiping(false);

			// The swipe wasn't started.
			if (!swipeInstance.current.isSwiping) {
				swipeInstance.current.isSwiping = null;
				closedLocation.current = null;
				return;
			}

			swipeInstance.current.isSwiping = null;

			const horizontal = isHorizontal(anchor);
			let current;
			if (horizontal) {
				current = calculateCurrentX(anchor, event.changedTouches);
			} else {
				current = calculateCurrentY(anchor, event.changedTouches);
			}

			const startLocation = horizontal ? swipeInstance.current.startX : swipeInstance.current.startY;
			const maxTranslate = getMaxTranslate(horizontal, transitionRef.current);
			const currentTranslate = getTranslate(current, startLocation, openRef.current, maxTranslate);
			const translateRatio = currentTranslate / maxTranslate;

			if (openRef.current) {
				if (swipeInstance.current.velocity > minFlingVelocity || translateRatio > hysteresis) {
					onClose && onClose();
				} else {
					// Reset the position, the swipe was aborted.
					setPosition(0, {
						mode: 'exit'
					});
				}

				return;
			}

			if (swipeInstance.current.velocity < -minFlingVelocity || 1 - translateRatio > hysteresis) {
				onOpen && onOpen();
			} else {
				// Reset the position, the swipe was aborted.
				const defaultClosedLocation =
					closedLocation.current || getMaxTranslate(horizontal, transitionRef.current);
				setPosition(defaultClosedLocation, {
					mode: 'enter'
				});
			}
			closedLocation.current = null;
		},
		[ anchor, hysteresis, minFlingVelocity, onClose, onOpen, setPosition ]
	);

	const handleBodyTouchMove = useCallback(
		(event) => {
			// the ref may be null when a parent component updates while swiping
			if (!transitionRef.current || !touchDetected.current) {
				return;
			}

			const horizontalSwipe = isHorizontal(anchor);

			const currentX = calculateCurrentX(anchor, event.touches);
			const currentY = calculateCurrentY(anchor, event.touches);

			// We don't know yet.
			if (swipeInstance.current.isSwiping == null) {
				const dx = Math.abs(currentX - swipeInstance.current.startX);
				const dy = Math.abs(currentY - swipeInstance.current.startY);

				// We are likely to be swiping, let's prevent the scroll event on iOS.
				if (dx > dy) {
					if (event.cancelable) {
						event.preventDefault();
					}
				}

				const definitelySwiping = horizontalSwipe
					? dx > dy && dx > UNCERTAINTY_THRESHOLD
					: dy > dx && dy > UNCERTAINTY_THRESHOLD;

				if (
					definitelySwiping === true ||
					(horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)
				) {
					swipeInstance.current.isSwiping = definitelySwiping;
					if (!definitelySwiping) {
						handleBodyTouchEnd(event);
						return;
					}

					// Shift the starting point.
					swipeInstance.current.startX = currentX;
					swipeInstance.current.startY = currentY;

					// Compensate for the part of the drawer displayed on touch start.
					if (!disableDiscovery && !openRef.current) {
						if (horizontalSwipe) {
							swipeInstance.current.startX -= swipeAreaWidth;
						} else {
							swipeInstance.current.startY -= swipeAreaWidth;
						}
					}
				}
			}

			if (!swipeInstance.current.isSwiping) {
				return;
			}
			const startLocation = horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY;
			const maxTranslate = getMaxTranslate(horizontalSwipe, transitionRef.current);

			const translate = getTranslate(
				horizontalSwipe ? currentX : currentY,
				startLocation,
				openRef.current,
				maxTranslate
			);

			if (swipeInstance.current.lastTranslate === null) {
				swipeInstance.current.lastTranslate = translate;
				swipeInstance.current.lastTime = performance.now() + 1;
			}

			const velocity =
				(translate - swipeInstance.current.lastTranslate) /
				(performance.now() - swipeInstance.current.lastTime) *
				1e3;
			// Low Pass filter.
			swipeInstance.current.velocity = swipeInstance.current.velocity * 0.4 + velocity * 0.6;

			swipeInstance.current.lastTranslate = translate;
			swipeInstance.current.lastTime = performance.now();

			// We are swiping, let's prevent the scroll event on iOS.
			if (event.cancelable) {
				event.preventDefault();
			}
			setPosition(translate);
		},
		[ setPosition, handleBodyTouchEnd, anchor, disableDiscovery, swipeAreaWidth ]
	);

	const handleBodyTouchStart = useCallback(
		(event) => {
			// We are not supposed to handle this touch move.
			if (nodeThatClaimedTheSwipe !== null && nodeThatClaimedTheSwipe !== swipeInstance.current) {
				return;
			}

			const horizontalSwipe = isHorizontal(anchor);

			const currentX = calculateCurrentX(anchor, event.touches);
			const currentY = calculateCurrentY(anchor, event.touches);

			if (!openRef.current) {
				if (disableSwipeToOpen || event.target !== swipeAreaRef.current) {
					return;
				}
				if (horizontalSwipe) {
					if (currentX > swipeAreaWidth) {
						return;
					}
				} else if (currentY > swipeAreaWidth) {
					return;
				}
			}

			nodeThatClaimedTheSwipe = swipeInstance.current;
			swipeInstance.current.startX = currentX;
			swipeInstance.current.startY = currentY;
			// console.log(transitionRef.current);
			setMaybeSwiping(true);
			// console.log(transitionRef.current);
			if (!openRef.current && transitionRef.current) {
				const computedStyle = window.getComputedStyle(transitionRef.current);
				const transform =
					computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
				closedLocation.current =
					transform && transform !== 'none' && typeof transform === 'string' ? transform : null;

				// The ref may be null when a parent component updates while swiping.
				setPosition(
					getMaxTranslate(horizontalSwipe, transitionRef.current) + (disableDiscovery ? 20 : -swipeAreaWidth),
					{
						changeTransition: false
					}
				);
			}

			swipeInstance.current.velocity = 0;
			swipeInstance.current.lastTime = null;
			swipeInstance.current.lastTranslate = null;

			touchDetected.current = true;
		},
		[ setPosition, anchor, disableDiscovery, disableSwipeToOpen, swipeAreaWidth ]
	);

	// console.log(maybeSwiping);
	useEffect(
		() => {
			document.body.addEventListener('touchstart', handleBodyTouchStart);
			document.body.addEventListener('touchmove', handleBodyTouchMove, { passive: false });
			document.body.addEventListener('touchend', handleBodyTouchEnd);

			return () => {
				document.body.removeEventListener('touchstart', handleBodyTouchStart);
				document.body.removeEventListener('touchmove', handleBodyTouchMove, { passive: false });
				document.body.removeEventListener('touchend', handleBodyTouchEnd);
			};

			return undefined;
		},
		[ handleBodyTouchStart, handleBodyTouchMove, handleBodyTouchEnd ]
	);

	useEffect(
		() => () => {
			// We need to release the lock.
			if (nodeThatClaimedTheSwipe === swipeInstance.current) {
				nodeThatClaimedTheSwipe = null;
			}
		},
		[]
	);

	useEffect(
		() => {
			if (!open) {
				setMaybeSwiping(false);
			}
		},
		[ open ]
	);

	if (!propModalProps.backdropProps) propModalProps.backdropProps = {};
	if (!propModalProps.backdropProps.transitionProps) propModalProps.backdropProps.transitionProps = {};
	if (!propModalProps.rootProps) propModalProps.rootProps = {};
	const handleBackdropTransitionRef = useCallback((element) => {
		backdropTransitionRef.current = element;
		getElementRef(propModalProps.backdropProps.transitionProps.refer, element);
	}, []);
	const modalProps = {
		onEscapeKeyDown,
		onOutsideClick,
		...propModalProps,
		...useMemo(
			() => {
				return {
					backdropProps: {
						...propModalProps.backdropProps,
						transitionProps: {
							...propModalProps.backdropProps.transitionProps,
							refer: handleBackdropTransitionRef
						}
					},
					rootProps: {
						...propModalProps.rootProps,
						classNames: [ $names.ucSwipeable_drawer, ...(propModalProps.rootProps.classNames || []) ]
					}
				};
			},
			[ propModalProps.backdropProps, propModalProps.rootProps ]
		)
	};

	const handleTransitionRef = useCallback((element) => {
		transitionRef.current = element;
		getElementRef(propTransitionProps.refer, element);
	}, []);
	const transitionProps = {
		...propTransitionProps,
		...useMemo(
			() => {
				return {
					refer: handleTransitionRef,
					classNames: [ $.ucSwipeable_drawerTransition, ...(propTransitionProps.classNames || []) ],
					gutter: 48
				};
			},
			[ propTransitionProps.classNames ]
		)
	};

	const handleSwipeAreaRef = useCallback((element) => {
		swipeAreaRef.current = element;
		getElementRef(swipeAreaProps.refer, element);
	}, []);

	return (
		<React.Fragment>
			<Drawer
				open={maybeSwiping ? true : open}
				modalProps={modalProps}
				transitionProps={transitionProps}
				anchor={anchor}
				keepMount={keepMount}
				onEscapeKeyDown={onEscapeKeyDown}
				onOutsideClick={onOutsideClick}
				{...props}
			>
				{children}
			</Drawer>
			{!disableSwipeToOpen && (
				<SwipeArea anchor={anchor} refer={handleSwipeAreaRef} width={swipeAreaWidth} {...swipeAreaProps} />
			)}
		</React.Fragment>
	);
};

export default SwipeableDrawer;
