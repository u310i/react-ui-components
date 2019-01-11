import React, { useState, useCallback, useRef, useMemo } from 'react';
import Drawer from './Drawer';

const DrawerContainer = ({
  theme,
  parentProps = {},
  options: { defaultDisplay, ...options },
  list,
  breakpoint,
  showBreakpoint,
  rootElement
}) => {
  const [state, setState] = useState(defaultDisplay ? 'open' : 'close');

  useMemo(
    () => {
      if (defaultDisplay === true) {
        setState('open');
      }
    },
    [defaultDisplay]
  );

  useMemo(
    () => {
      if (state === 'open' && !showBreakpoint.includes(breakpoint)) {
        setState('close');
      }
    },
    [breakpoint]
  );

  const onClick = useCallback(() => {
    setState(prev => {
      return prev === 'close' ? 'open' : 'close';
    });
  }, []);

  const onClose = useCallback(() => {
    setState('close');
  }, []);

  const Component = (
    <Drawer
      theme={theme}
      options={options}
      parentProps={parentProps}
      list={list}
      onClose={onClose}
      state={state}
      rootElement={rootElement}
    />
  );

  const drawer = {
    component: Component,
    state: state,
    setState: setState,
    onClick: onClick,
    onClose: onClose
  };

  return drawer;
};

export default DrawerContainer;
