import React, { useCallback, useEffect, useRef } from 'react';
import { getNode, addEventListener, removeEventListener, createOptimizedEvent } from 'scripts';

const defaultOption = {};

const EventListener = ({
	children,
	target: propTarget = document,
	type,
	listener,
	option = defaultOption,
	optimized = false
}) => {
	const prevScopeRef = useRef(null);
	const prevTypeRef = useRef(null);
	const prevListenerRef = useRef(null);
	const prevOptionRef = useRef(null);

	const listenerRef = useRef(null);

	const rafCancelRef = useRef(null);
	const clearOptimize = useCallback(() => {
		rafCancelRef.current && rafCancelRef.current();
	}, []);

	useEffect(
		() => {
			const target = getNode(propTarget);

			const changedScope = target !== prevScopeRef.current;
			const changedType = type !== prevTypeRef.current;
			const changedListener = listener !== prevListenerRef.current;
			const changedOption = option !== prevOptionRef.current;

			const canRemoveEvent =
				prevScopeRef.current || prevTypeRef.current || prevListenerRef.current || prevOptionRef.current;

			if (changedScope || changedType || changedListener || changedOption) {
				listenerRef.current = optimized ? createOptimizedEvent(listener, optimizeClearlRef) : listener;
				canRemoveEvent &&
					removeEventListener(
						changedScope ? prevScopeRef.current || target : target,
						changedType ? prevTypeRef.current || type : type,
						changedListener ? prevListenerRef.current || listenerRef.current : listenerRef.current,
						changedOption ? prevOptionRef.current || option : option
					);
				clearOptimize();
				addEventListener(target, type, listenerRef.current, option);
			}

			prevScopeRef.current = target;
			prevTypeRef.current = type;
			prevListenerRef.current = listener;
			prevOptionRef.current = option;

			return () => {
				removeEventListener(target, type, listenerRef.current, option);
				clearOptimize();
			};
		},
		[ propTarget, type, listener, option, optimized ]
	);

	return children || null;
};

export default EventListener;
