import React from 'react';
import { createPortal } from 'react-dom';
import {} from 'scripts';
import {} from '..';

const Portal = ({ children, mountNode = document.body }) => {
	return createPortal(children, mountNode);
};

export default Portal;
