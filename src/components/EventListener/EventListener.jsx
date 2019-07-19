import React, { React.useCallback, useEffect, useRef } from 'react';
import { getNode, addEventListener, createOptimizedEvent, isObject } from 'scripts';

const defaultOptions = {};

const EventListener = ({
	children,
	target: propTarget = document,
	type,
	listener,
	options = defaultOptions,
	optimized = false
}) => {
	const removeEventListenerRef = useRef(null);
	const prevPropsRef = useRef(null);

	useEffect(
		() => {
			const target = getNode(propTarget);
			if (!target) return;

			if (prevPropsRef.current) {
				const changedScope = target !== prevPropsRef.current.target;
				const changedType = type !== prevPropsRef.current.type;
				const changedListener = listener !== prevPropsRef.current.listener;
				const prevOptions = prevPropsRef.current.options;
				const changedOptions =
					options.capture !== prevOptions.capture ||
					options.once !== prevOptions ||
					options.passive !== prevOptions.passive;
				const changedOptimized = optimized !== prevPropsRef.current.optimized;

				if (changedScope || changedType || changedListener || changedOptions || changedOptimized) {
					removeEventListenerRef.current && removeEventListenerRef.current();
					removeEventListenerRef.current = addEventListener(target, type, listener, options, optimized);
				}
			} else {
				removeEventListenerRef.current = addEventListener(target, type, listener, options, optimized);
			}

			prevPropsRef.current = {
				target,
				type,
				listener,
				options,
				optimized
			};

			return () => {
				removeEventListenerRef.current && removeEventListenerRef.current();
			};
		},
		[ propTarget, type, listener, options, optimized ]
	);

	return children || null;
};

export default EventListener;
