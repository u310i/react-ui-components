import React, { useCallback, useRef, useLayoutEffect, useReducer } from 'react';
import { Transition } from 'react-transition-group';
import { reflow } from 'scripts';

const _APPEAR = 'appear';
const _ENTER = 'enter';
const _EXIT = 'exit';

const getClassNames = (type) => {
	return [ type, type + '-active', type + '-done' ];
};

const removeClasses = (node, type) => {
	node.classList.remove(...getClassNames(type));
};

const ReactCSSTransitionFork = ({
	in: inProp,
	appear = false,
	disableClassing = false,
	lazyAppear = false,
	onEnter,
	onEntering,
	onEntered,
	onExit,
	onExiting,
	onExited,
	...props
}) => {
	const inRef = useRef(null);
	const shouldTransitionOnAppear = useRef(null);
	const appearingStates = useRef({
		enter: null,
		entering: null,
		entered: null
	});

	const [ , forceUpdate ] = useReducer((x) => x + 1, 0);

	// When "appear" and "in" are true, "onEntered" occurs immediately after "onEntering", not after transition.
	// Transition occurs because the order is kept, but you can not execute anything after transition.
	// Therefore, at the time of the first rendering, set "in" to false, do not execute "appearing" of "Transition",
	//  and generate as "appearing" after update.
	if (shouldTransitionOnAppear.current === null && lazyAppear && appear && inProp) {
		shouldTransitionOnAppear.current = true;
		inRef.current = false;
	} else {
		inRef.current = inProp;
		shouldTransitionOnAppear.current = false;
	}

	useLayoutEffect(() => {
		if (shouldTransitionOnAppear.current) {
			appearingStates.current.enter = true;
			appearingStates.current.entering = true;
			appearingStates.current.entered = true;
			forceUpdate();
		}
	}, []);

	const handleOnEnter = useCallback(
		(node, appearing) => {
			const isAppearing = lazyAppear ? appearingStates.current.enter : appearing;

			if (!disableClassing) {
				removeClasses(node, _EXIT);
				const classNameList = getClassNames(isAppearing ? _APPEAR : _ENTER);
				node.classList.add(classNameList[0]);
			}
			if (onEnter) onEnter(node, isAppearing);

			if (isAppearing) appearingStates.current.enter = false;
		},
		[ onEnter ]
	);

	const handleOnEntering = useCallback(
		(node, appearing) => {
			reflow(node);
			const isAppearing = lazyAppear ? appearingStates.current.entering : appearing;

			if (!disableClassing) {
				const classNameList = getClassNames(isAppearing ? _APPEAR : _ENTER);
				node.classList.add(classNameList[1]);
			}
			if (onEntering) onEntering(node, lazyAppear ? isAppearing : appearing);

			if (isAppearing) appearingStates.current.entering = false;
		},
		[ onEntering ]
	);

	const handleOnEntered = useCallback(
		(node, appearing) => {
			const isAppearing = lazyAppear ? appearingStates.current.entered : appearing;

			if (!disableClassing) {
				removeClasses(node, isAppearing ? _APPEAR : _ENTER);
				const classNameList = getClassNames(_ENTER);
				node.classList.add(classNameList[2]);
			}
			if (onEntered) onEntered(node, lazyAppear ? isAppearing : appearing);

			if (isAppearing) appearingStates.current.entered = false;
		},
		[ onEntered ]
	);

	const handleOnExit = useCallback(
		(node) => {
			if (appearingStates.current.appeared) {
				appearingStates.current.enter = false;
				appearingStates.current.entering = false;
				appearingStates.current.entered = false;
			}
			if (!disableClassing) {
				const classNameList = getClassNames(_EXIT);

				removeClasses(node, _APPEAR);
				removeClasses(node, _ENTER);
				node.classList.add(classNameList[0]);
			}
			if (onExit) onExit(node);
		},
		[ onExit ]
	);

	const handleOnExiting = useCallback(
		(node) => {
			reflow(node);
			if (!disableClassing) {
				const classNameList = getClassNames(_EXIT);

				node.classList.add(classNameList[1]);
			}
			if (onExiting) onExiting(node);
		},
		[ onExiting ]
	);

	const handleOnExited = useCallback((node) => {
		if (!disableClassing) {
			const classNameList = getClassNames(_EXIT);
			removeClasses(node, _EXIT);
			node.classList.add(classNameList[2]);
		}
		if (onExited) onExited(node);
	}, []);

	return (
		<Transition
			{...props}
			in={inRef.current}
			appear={appear}
			onEnter={handleOnEnter}
			onEntering={handleOnEntering}
			onEntered={handleOnEntered}
			onExit={handleOnExit}
			onExiting={handleOnExiting}
			onExited={handleOnExited}
		/>
	);
};

export default ReactCSSTransitionFork;
