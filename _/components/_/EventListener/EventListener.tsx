import * as React from 'react';
import { useAddEventListener } from 'scripts';

const EventListener = ({ children, target, type, callback, options = {} }) => {
	// default is { optimized = true, enable = true, dependencies = [], ...listenerOptions = {} } = options
	useAddEventListener(target, type, callback, options);
	return children || null;
};

export default EventListener;
