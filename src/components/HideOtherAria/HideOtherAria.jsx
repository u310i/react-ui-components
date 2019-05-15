import React, { useMemo, useEffect, useRef } from 'react';
import {} from 'scripts';
import { DivElement } from '..';

const HideOtherAria = ({ children, parent = document.body }) => {
	const targetRef = useRef();
	const hiddenNodes = useRef([]);

	const deep = (parent) => {
		if (targetRef.current === parent || parent.children.length === 0) return;

		Array.from(parent.children, (childNode) => {
			if (childNode.contains(targetRef.current)) {
				deep(childNode);
			} else {
				const attr = childNode.getAttribute('aria-hidden');
				const alreadyHidden = attr !== null && attr !== 'false';

				if (!alreadyHidden) {
					hiddenNodes.current.push(childNode);
					childNode.setAttribute('aria-hidden', 'true');
				}
			}
		});
	};

	useEffect(() => {
		deep(parent);
		return () => {
			hiddenNodes.current.forEach((node) => {
				node.removeAttribute('aria-hidden');
			});
			hiddenNodes.current = [];
		};
	}, []);

	const style = useMemo(() => {
		return {};
	});

	return (
		<DivElement refer={targetRef} style={style} className="uc-hideOtherAria">
			{children}
		</DivElement>
	);
};

export default HideOtherAria;
