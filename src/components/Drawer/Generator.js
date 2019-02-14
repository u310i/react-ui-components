import React, { useState, useCallback, useRef, useMemo } from 'react';
import Drawer from './Drawer';

const DrawerContainer = ({ externalToggleButton, list, ...props }) => {
  const [state, setState] = useState(defaultDisplay ? 'open' : 'close');

  const onClick = useCallback(() => {
    setState(prev => {
      return prev === 'close' ? 'open' : 'close';
    });
  }, []);

  const onClose = useCallback(() => {
    setState('close');
  }, []);

  const Toggle = useMemo(
    () => {
      if (externalToggleButton) {
        const { style = {}, open = {}, close = {} } = externalToggleButton;
        const icon = open.icon
          ? close.icon && state === 'close'
            ? close
            : open
          : {
              type: 'fa',
              icon: faBars
            };
        return (
          <IconButton
            style={style}
            onClick={drawerContainer.onClick}
            icon={icon}
          />
        );
      }
    },
    [state]
  );

  const Component = useMemo(
    () => <Drawer onClose={onClose} state={state} list={list} {...props} />,
    [list]
  );

  const drawer = {
    component: Component,
    toggleButton: Toggle,
    state: state,
    setState: setState,
    onClick: onClick,
    onClose: onClose
  };

  return drawer;
};

export default DrawerContainer;
