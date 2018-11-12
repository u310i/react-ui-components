import React, { useState } from 'react';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import ActionIcon from 'atoms/ActionIcon';
import Drawer from 'molecules/Drawer';

export default ({
  theme,
  containerProps: { general, container, drawer, actionIcon }
}) => {
  const [toggleState, setToggleState] = useState('close');
  const toggle = () => {
    setToggleState(toggleState === 'close' ? 'open' : 'close');
  };

  if (!actionIcon.container.icon.close) {
    actionIcon.container.icon.name = faBars;
  } else {
    actionIcon.container.icon.name =
      toggleState === 'close'
        ? actionIcon.container.icon.close
        : actionIcon.container.icon.open;
  }

  const componentStyle = {
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    height: '3rem',
    [theme.breakpoints.maxWidthPresets.sm]: {
      // position: 'fixed',
      // top: '0',
      // left: '0',
      // right: '0',
      // height: '3rem',
      // width: '100%',
      // backgroundColor: '#4169e1'
    }
  };
  return (
    // <nav className={cx(css(componentStyle), css(container.styles))}>
    <nav css={componentStyle} className={cx(css(container.styles))}>
      <Drawer
        theme={theme}
        containerProps={{ ...drawer, general }}
        toggleState={toggleState}
      />
      <ActionIcon
        theme={theme}
        containerProps={{
          ...actionIcon,
          general
        }}
        toggle={toggle}
      />
    </nav>
  );
};
