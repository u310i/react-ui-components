import React, { useMemo, useEffect, useRef } from 'react';
import {} from 'scripts';
import { DivElement } from '..';

const HideOtherAria = ({ children, style: propStyle = {}, parent = document.body, refer, ...props }) => {
	const targetRef = useRef();
	refer = targetRef;
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

	return (
		<DivElement refer={targetRef} style={propStyle} className="uc-hideOtherAria" {...props}>
			{children}
		</DivElement>
	);
};

export default HideOtherAria;
