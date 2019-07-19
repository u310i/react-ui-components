import React, { React.useCallback, useMemo, useEffect, useRef } from 'react';
import { getElementRef, getNode } from 'scripts';
import { DivElement } from '..';

const HideOtherAria = ({ children, parent = document.body, active = true, ...props }) => {
	const _ref_ = useRef();
	const hiddenNodesRef = useRef([]);
	const prevActiveRef = useRef(null);

	const activate = React.useCallback(
		(parent) => {
			if (_ref_.current === parent || parent.children.length === 0) return;
			Array.from(parent.children, (childNode) => {
				if (childNode.contains(_ref_.current)) {
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
		[ active ]
	);

	const deactivate = React.useCallback(() => {
		hiddenNodesRef.current.forEach((node) => {
			node.removeAttribute('aria-hidden');
		});
		hiddenNodesRef.current = [];
	}, []);

	useEffect(
		() => {
			if (!prevActiveRef.current && active) {
				const parentElement = getNode(parent);
				activate(parentElement);
			} else if (prevActiveRef.current && !active) {
				deactivate();
			}
			prevActiveRef.current = active;
			return () => {
				deactivate();
				prevActiveRef.current = false;
			};
		},
		[ active, parent ]
	);

	return (
		<DivElement _refer_={_ref_} _className_={'uc-hideOtherAria'} {...props}>
			{children}
		</DivElement>
	);
};

export default HideOtherAria;
