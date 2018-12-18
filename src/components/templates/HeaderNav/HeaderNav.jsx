import React, { useState, useCallback, useRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import {} from 'utilities/utils';
import {} from 'utilities/hooks';
import Header from 'organisms/Header';
import IconButton from 'atoms/IconButton';
import Drawer from 'molecules/Drawer';
import Menu from 'molecules/Menu';
import AppBar from 'atoms/AppBar';

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
