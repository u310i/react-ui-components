import React, { useCallback, useMemo, useEffect, useRef } from 'react';
import { getElementRef } from 'scripts';
import { DivElement } from '..';

const HideOtherAria = ({ children, refer, style: propStyle = {}, parent = document.body, active = true, ...props }) => {
	const ref = useRef();
	const hiddenNodesRef = useRef([]);
	const prevActiveRef = useRef(null);

	const activate = useCallback(
		(parent) => {
			if (ref.current === parent || parent.children.length === 0) return;
			Array.from(parent.children, (childNode) => {
				if (childNode.contains(ref.current)) {
					activate(childNode);
				} else {
					const attr = childNode.getAttribute('aria-hidden');
					const alreadyHidden = attr !== null && attr !== 'false';

					if (!alreadyHidden) {
						hiddenNodesRef.current.push(childNode);
						childNode.setAttribute('aria-hidden', 'true');
					}
				}
			});
		},
		[ parent, active ]
	);

	const deactivate = useCallback(() => {
		hiddenNodesRef.current.forEach((node) => {
			node.removeAttribute('aria-hidden');
		});
		hiddenNodesRef.current = [];
	}, []);

	useEffect(
		() => {
			if (!prevActiveRef.current && active) {
				activate(parent);
			} else if (prevActiveRef.current && !active) {
				deactivate();
			}
			prevActiveRef.current = active;
			return () => {
				deactivate();
				prevActiveRef.current = false;
			};
		},
		[ active ]
	);

	return (
		<DivElement
			refer={(element) => {
				ref.current = element;
				getElementRef(refer, element);
			}}
			style={propStyle}
			className="uc-hideOtherAria"
			{...props}
		>
			{children}
		</DivElement>
	);
};

export default HideOtherAria;
