import React from 'react';
import { addEventListener } from 'scripts';

const EventListener = ({ children, target, type, callback, options = {} }) => {
  // default is { optimized = true, enable = true, dependencies = [], ...listenerOptions = {} } = options
  addEventListener(target, type, callback, options);
  return <>{children}</>;
};

export default EventListener;
