import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {} from 'scripts';
import {} from '..';

const Portal = ({ children, container = document.body, disablePortal = false, onMount, onUnmount }) => {
	useEffect(() => {
		onMount && onMount();
		return () => {
			onUnmount && onUnmount();
		};
	}, []);
	return disablePortal ? children : createPortal(children, container);
};

export default Portal;
