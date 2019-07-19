import React, { useState, React.useCallback, useRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-main-svg-icons';

import {} from 'scripts';
import {} from 'scripts';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import Drawer from 'components/Drawer';
import Menu from 'components/Menu';
import AppBar from 'components/AppBar';

const HeaderNav = ({
  propRef = null,
  parent = {},
  breakpointState,
  componentProps,
  theme
}) => {
  return (
    <Header
      theme={theme}
      breakpointState={breakpointState}
      componentProps={componentProps}
    >
      {BarItemComponent}
    </Header>
  );
};

export default HeaderNav;
